import Redis from 'ioredis'

export class ApiCache {
  private keys: Set<string>
  private redis: Redis
  private enableLogging: boolean

  constructor(args?: { enableLogging?: boolean }) {
    this.enableLogging = args?.enableLogging ?? false
    this.keys = new Set()

    if (typeof process.env.REDIS_URL === 'string') {
      this.redis = new Redis(process.env.REDIS_URL)
    } else {
      throw new Error('Env `REDIS_URL` is not defined')
    }
  }

  public deleteUnrevisedRevisions() {
    this.markKey('serlo.org/unrevised')
  }

  public deleteThreadIds(uuid: number) {
    this.markKey(`de.serlo.org/api/threads/${uuid}`)
  }

  public markEvent(eventId: number) {
    this.markKey(`de.serlo.org/api/event/${eventId}`)
  }

  public async markAllNotifications() {
    const keys = await this.redis.keys('de.serlo.org/api/notifications/*')

    for (const key of keys) {
      this.keys.add(key)
    }
  }

  public markUuid(uuid: number) {
    this.markKey(`de.serlo.org/api/uuid/${uuid}`)

    if (this.enableLogging) {
      console.log(`INFO: API cache for UUID ${uuid} deleted`)
    }
  }

  public async deleteKeysAndQuit() {
    await this.redis.del(...this.keys)
    await this.redis.quit()
  }

  private markKey(key: string) {
    this.keys.add(key)
  }
}
