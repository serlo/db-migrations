import Redis from 'ioredis'

export class ApiCache {
  private redis: Redis

  constructor() {
    if (typeof process.env.REDIS_URL === 'string') {
      this.redis = new Redis(process.env.REDIS_URL)
    } else {
      throw new Error('Env `REDIS_URL` is not defined')
    }
  }

  public async quit() {
    await this.redis.quit()
  }

  public async deleteUuid(uuid: number, logging = true) {
    await this.redis.del(`de.serlo.org/api/uuid/${uuid}`)
    if (logging) console.log(`INFO: API cache for UUID ${uuid} deleted`)
  }
}
