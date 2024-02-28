import { createMigration } from './utils'
import { ApiCache } from './utils/api-cache'

createMigration(exports, {
  up: async () => {
    const apiCache = new ApiCache()
    await apiCache.deleteKeysOlderThan(Math.round(60 * 60 * 24 * 30 * 1.5))
    await apiCache.quit()
  },
})
