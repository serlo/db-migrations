import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await db.runSql(`
        ALTER TABLE instance
        DROP COLUMN IF EXISTS language_id;
      `)
    await db.runSql(`
        DROP TABLE IF EXISTS
          ad,
          ad_page,
          instance_permission,
          language, metadata,
          metadata_key,
          navigation_container,
          navigation_page,
          navigation_parameter,
          navigation_parameter_key,
          page_repository_role,
          permission,
          related_content,
          related_content_category,
          related_content_container,
          related_content_external,
          related_content_internal,
          role_inheritance,
          role_permission,
          session,
          term_taxonomy_comment, 
          user_field;
      `)
  },
})
