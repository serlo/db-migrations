import { createWriteStream } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import { WebClient } from '@slack/web-api'

export class SlackLogger {
  private logFileName: string
  private logFilePath: string
  private logFileStream: ReturnType<typeof createWriteStream>

  constructor(private name: string) {
    const currentDate = new Date().toISOString().slice(0, 10)

    this.logFileName = `${currentDate}-${this.name}.log.jsonl`
    this.logFilePath = path.join(tmpdir(), this.logFileName)
    this.logFileStream = createWriteStream(this.logFilePath)

    this.logEvent('logStarted', { name: this.name })
  }

  logEvent(eventType: string, data: unknown) {
    const event = { eventType, data, time: new Date().toISOString() }

    this.logFileStream.write(JSON.stringify(event))
    this.logFileStream.write('\n')
  }

  async closeAndSend() {
    this.close()
    await this.send()
  }

  protected close() {
    this.logEvent('logEnded', { name: this.name })

    this.logFileStream.close()
  }

  protected async send() {
    const environment = process.env.ENVIRONMENT
    const token = process.env.SLACK_TOKEN
    const channel = process.env.SLACK_CHANNEL

    if (token == null) return

    const slack = new WebClient(token)

    await slack.files.uploadV2({
      file: this.logFilePath,
      filename: this.logFileName,
      channel_id: channel,
      initial_comment: `*${environment}:* Migration "${this.name}" finished.`,
    })
  }
}
