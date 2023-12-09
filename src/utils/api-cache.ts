import Redis from 'ioredis'

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
}
