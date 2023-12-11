import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    // here for historical reasons, after 20231127000000-delete-unused-tables.ts it was throwing error in CI
    // await db.runSql('DELETE FROM ad_page WHERE page_repository_id = 18340')
    await db.runSql(
      'DELETE FROM uuid WHERE trashed = 1 AND discriminator = "page"',
    )
  },
})
