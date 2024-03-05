import { createMigration } from './utils'

/**
 * Removes all entities of type `text-hint` from the database.
 * THIS IS AN IRREVERSIBLE MIGRATION!
 */
createMigration(exports, {
  up: async (db) => {
    const results = await db.runSql<{ id: number }[]>(
      `SELECT id FROM type WHERE name = 'text-hint'`,
    )

    if (results.length !== 1) {
      throw new Error('Expected type `text-hint` to exist')
    }

    const { id } = results[0]
    await db.runSql(
      `DELETE FROM uuid WHERE id = ANY (SELECT id FROM entity WHERE type_id = ?)`,
      id,
    )
  },
})
