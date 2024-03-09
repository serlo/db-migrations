import { createMigration } from './utils'
import Redis from 'ioredis'

createMigration(exports, {
  up: async (db) => {
    await db.runSql(`
      DELETE FROM url_alias WHERE alias = 'mathe-pruefungen'
      `)

    if (typeof process.env.REDIS_URL === 'string') {
      const redis = new Redis(process.env.REDIS_URL)
      redis.del('de.serlo.org/api/alias/mathe-pruefungen')
      redis.quit()
    } else {
      throw new Error('Env `REDIS_URL` is not defined')
    }
  },
})
