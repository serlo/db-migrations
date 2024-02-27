import { createMigration } from './utils'
import { ApiCache } from './utils/api-cache'

createMigration(exports, {
  up: async () => {
    const apiCache = new ApiCache()
    await apiCache.deleteKeysOlderThan(60 * 60 * 24 * 30 * 2)
    await apiCache.quit()
  }
})
