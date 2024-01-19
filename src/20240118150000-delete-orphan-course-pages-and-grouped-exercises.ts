import { createMigration } from './utils'

createMigration(exports, {
  up: async (db) => {
    await db.runSql(`
      DELETE FROM uuid 
      WHERE id IN (
        SELECT id
        FROM entity
        WHERE type_id IN (SELECT id FROM type 
                          WHERE name = "course-page"
                          OR name = "grouped-text-exercise")
        AND id NOT IN (SELECT child_id FROM entity_link)
        AND id NOT IN (SELECT entity_id FROM term_taxonomy_entity)
      )
    `)
  },
})
