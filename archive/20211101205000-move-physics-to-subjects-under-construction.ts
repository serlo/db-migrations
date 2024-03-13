import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await db.runSql(
      `UPDATE term_taxonomy SET parent_id = 106081 WHERE id = 41107;`,
    )
  },
})
