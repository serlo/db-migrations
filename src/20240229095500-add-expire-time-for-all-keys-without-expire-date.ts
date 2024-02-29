import { Redis } from 'ioredis'
import { SlackLogger, createMigration } from './utils'
import assert from 'assert'

createMigration(exports, {
  up: async () => {
    assert(process.env.REDIS_URL != null, 'REDIS_URL must be defined')

    const oneWeek = 60 * 60 * 24 * 7
    const migrationName = 'add-expire-time-for-all-keys-without-expire-date'
    const slackLogger = new SlackLogger(migrationName)
    const redis = new Redis(process.env.REDIS_URL)

    // We use a scan instead of keys() to avoid loading all keys into the
    // memory, so that we avoid a crash when the memory is not enough to hold
    // all keys (besides this implementation should be faster)
    const numberOfKeysPerScan = 1000

    // Start cursor for the scan needs to be "0"
    let lastCursor = '0'

    while (true) {
      const [newCursor, keys] = await redis.scan(
        lastCursor,
        'MATCH',
        '*',
        'COUNT',
        numberOfKeysPerScan,
      )

      for (const key of keys) {
        const ttl = await redis.ttl(key)

        if (ttl === -1 && !key.startsWith('bq:swr:')) {
          const newTtl = Math.round(Math.random() * oneWeek)

          await redis.expire(key, newTtl)

          console.log(`INFO: Key ${key} with new expire time ${newTtl}`)
          slackLogger?.logEvent('setTtlForKey', { key, newTtl })
        }
      }

      lastCursor = newCursor

      // cursor is set to "0" in the last scan
      // see https://redis.io/commands/scan/
      if (keys.length === 0 || newCursor === '0') break
    }

    await redis.quit()
    await slackLogger.closeAndSend()
  },
})
