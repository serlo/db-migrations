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

  public async deleteInactiveKeys(
    timeLimit: number,
    slackLogger?: SlackLogger,
  ) {
    // We use a scan instead of keys() to avoid loading all keys into the
    // memory, so that we avoid a crash when the memory is not enough to hold
    // all keys (besides this implementation should be faster)
    const numberOfKeysPerScan = 1000

    // Start cursor for the scan needs to be "0"
    let lastCursor = '0'

    while (true) {
      const [newCursor, keys] = await this.redis.scan(
        lastCursor,
        'MATCH',
        '*',
        'COUNT',
        numberOfKeysPerScan,
      )

      for (const key of keys) {
        const timeSinceLastAccess = await this.redis.object('IDLETIME', key)

        if (
          typeof timeSinceLastAccess !== 'number' ||
          timeSinceLastAccess > timeLimit
        ) {
          await this.redis.del(key)
          console.log(
            `INFO: Key ${key} deleted (time since last access: ${timeSinceLastAccess})`,
          )
          slackLogger?.logEvent('deleteRedisKey', { key, timeSinceLastAccess })
        }
      }

      lastCursor = newCursor

      // cursor is set to "0" in the last scan
      // see https://redis.io/commands/scan/
      if (keys.length === 0 || newCursor === '0') break
    }
  }
}
