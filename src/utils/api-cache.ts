import Redis from 'ioredis'

export class ApiCache {
  private keys: Set<string>
  private redis: Redis

  constructor() {
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
  }

  public async deleteKeysAndQuit() {
    if (this.keys.size > 0) {
      await this.redis.del(Array.from(this.keys))
    }
    await this.redis.quit()
  }

  private markKey(key: string) {
    this.keys.add(key)
  }
}
