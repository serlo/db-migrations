import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await db.runSql('DELETE FROM ad_page WHERE page_repository_id = 18340')
    await db.runSql(
      'DELETE FROM uuid WHERE trashed = 1 AND discriminator = "page"',
    )
  },
})
