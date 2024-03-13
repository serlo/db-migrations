import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await db.runSql('DELETE FROM uuid WHERE id = 247317')

    await db.runSql('UPDATE term_taxonomy SET parent_id = 3 WHERE id = 106081')
    await db.runSql(
      'UPDATE term_taxonomy SET taxonomy_id = 3 WHERE id = 106081',
    )

    await db.runSql('UPDATE term_taxonomy SET taxonomy_id = 4 WHERE id = 41107')
  },
})
