import { createMigration } from './utils'

createMigration(exports, {
  up: async (db) => {
    const uuidsToDelete: { id: number }[] = await db.runSql(`
      SELECT id
      FROM entity
      WHERE id NOT IN (SELECT child_id FROM entity_link)
      AND id NOT IN (SELECT entity_id FROM term_taxonomy_entity) 
      `)
    if (uuidsToDelete.length > 0) {
      const uuidsToDeleteSeparatedByComma = uuidsToDelete
        .map((item) => item.id)
        .join(', ')
      await db.runSql(`
        DELETE FROM uuid 
        WHERE id IN (${uuidsToDeleteSeparatedByComma})
        `)
    }
  },
})
