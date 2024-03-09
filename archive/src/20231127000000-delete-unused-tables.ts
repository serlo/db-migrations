import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    // remove reference to the language table we want to delete
    const result: { count: number }[] = await db.runSql(`
      SELECT COUNT(*) as count
      FROM information_schema.columns
      WHERE table_name = 'instance' AND column_name = 'language_id';
    `)
    if (result[0]['count'] > 0) {
      await db.runSql(`
        ALTER TABLE instance
        DROP FOREIGN KEY fk_instance_language1;
      `)
      await db.runSql(`
        ALTER TABLE instance
        DROP COLUMN language_id;
      `)
    }

    // now delete the tables
    await db.runSql(`
      DROP TABLE IF EXISTS
        ad,
        ad_page,
        attachment_container,
        attachment_file,
        blog_post,
        comment_vote,
        flag,
        instance_permission,
        language,
        metadata,
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

    // remove the deleted content with UUID also from the uuid table
    await db.runSql(`
      DELETE FROM uuid 
      WHERE discriminator IN ('attachment', 'blogPost');
    `)
  },
})
