import { SlackLogger, createMigration } from './utils'
import { ApiCache } from './utils/api-cache'

createMigration(exports, {
  up: async () => {
    const apiCache = new ApiCache()
    const migrationName = 'delete-redis-keys-older-than-1.5-months'
    const slackLogger = new SlackLogger(migrationName)
    await apiCache.deleteInactiveKeys(
      Math.round(60 * 60 * 24 * 30 * 1.5),
      slackLogger,
    )
    await apiCache.quit()
    await slackLogger.closeAndSend()
  },
})
