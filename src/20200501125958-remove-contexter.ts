import { createMigration } from './utils'

/**
 * Removes all rows & permissions from the database that were used by the Contexter module
 * THIS IS AN IRREVERSIBLE MIGRATION!
 */
createMigration(module.exports, {
  up: async (db) => {
    await db.dropTable('context_route_parameter')
    await db.dropTable('context_route')
    await db.dropTable('context')
    await db.runSql(`DELETE FROM permission WHERE name LIKE "contexter.%"`)
  },
})
