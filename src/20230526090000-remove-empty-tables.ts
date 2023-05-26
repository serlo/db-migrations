import { createMigration } from './utils'

createMigration(exports, {
  up: async (db) => {
    await db.runSql(`
        UPDATE entity_revision_field
            SET value = replace(value,'{"plugin":"table","state":""},','')
            WHERE value like '%{"plugin":"table","state":""},%' 
    `)

    // 10 are at the end of an array, so no trailing comma
    await db.runSql(`
        UPDATE entity_revision_field
            SET value = replace(value,'{"plugin":"table","state":""}','')
            WHERE value like '%{"plugin":"table","state":""}%' 
    `)
  },
})
