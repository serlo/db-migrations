import { clearDeadUuids, createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await clearDeadUuids(db)
  },
})
