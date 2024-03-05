import {
  ApiCache,
  createMigration,
  deleteUnsupportedEntityTypes,
} from './utils'

const unsupportedEntityTypes = ['text-solution']

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache()

    await deleteUnsupportedEntityTypes({ db, apiCache, unsupportedEntityTypes })

    await apiCache.quit()
  },
})
