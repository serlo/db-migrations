import Redis from 'ioredis'
import { SlackLogger } from './slack-logger'

export class ApiCache {
  private redis: Redis
  private enableLogging: boolean

  constructor(args?: { enableLogging?: boolean }) {
    this.enableLogging = args?.enableLogging ?? false

    if (typeof process.env.REDIS_URL === 'string') {
      this.redis = new Redis(process.env.REDIS_URL)
    } else {
      throw new Error('Env `REDIS_URL` is not defined')
    }
  }

  public async quit() {
    await this.redis.quit()
  }

  public async deleteUnrevisedRevisions() {
    await this.redis.del('serlo.org/unrevised')
  }

  public async deleteThreadIds(uuid: number) {
    await this.redis.del(`de.serlo.org/api/threads/${uuid}`)
  }

  public async deleteEvent(eventId: number) {
    await this.redis.del(`de.serlo.org/api/event/${eventId}`)
  }

  public async deleteAllNotifications() {
    const keys = await this.redis.keys('de.serlo.org/api/notifications/*')

    for (const key of keys) {
      await this.redis.del(key)
    }
  }

  public async deleteUuid(uuid: number) {
    await this.redis.del(`de.serlo.org/api/uuid/${uuid}`)

    if (this.enableLogging) {
      console.log(`INFO: API cache for UUID ${uuid} deleted`)
    }
  }

  public async deleteKeysOlderThan(
    timeInSeconds: number,
    slackLogger?: SlackLogger,
  ) {
    const numberOfKeysPerScan = 1000
    const currentTimestamp = new Date().getSeconds()

    let lastCursor = '0'

    while (true) {
      const [newCursor, keys] = await this.redis.scan(
        lastCursor,
        'MATCH',
        '*',
        'COUNT',
        numberOfKeysPerScan,
      )

      for (const key in keys) {
        const keyCreationTime = await this.redis.object('IDLETIME', key)
        if (
          typeof keyCreationTime !== 'number' ||
          currentTimestamp - keyCreationTime > timeInSeconds
        ) {
          await this.redis.del(key)
          slackLogger?.logEvent('deleteRedisKey', { key, keyCreationTime })
        }
      }

      lastCursor = newCursor

      if (keys.length === 0 || newCursor === '0') break
    }
  }
}
