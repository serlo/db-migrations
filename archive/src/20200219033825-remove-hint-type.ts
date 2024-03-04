import { createMigration } from './utils'

/**
 * Removes type `text-hint` from the database.
 */
createMigration(module.exports, {
  up: async (db) => {
    await db.runSql(`DELETE FROM type WHERE name = 'text-hint'`)
  },
  down: async (db) => {
    await db.runSql(`INSERT INTO type (name) VALUES ('text-hint')`)
  },
})
