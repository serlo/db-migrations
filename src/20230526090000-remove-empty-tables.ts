import { createMigration } from './utils'

createMigration(module.exports, {
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

    await db.runSql(String.raw`
      UPDATE entity_revision_field
        SET value = replace(value,'{"plugin":"table","state":"\\n"},','')
        WHERE value like '%{"plugin":"table","state":"\\n"},%' ESCAPE '|'
    `)

    await db.runSql(`
      UPDATE page_revision
        SET content = replace(content,'{"plugin":"table","state":""},','')
        WHERE content like '%{"plugin":"table","state":""},%'
    `)

    await db.runSql(`
      UPDATE page_revision
        SET content = replace(content,'{"plugin":"table","state":""}','')
        WHERE content like '%{"plugin":"table","state":""}%'
    `)
  },
})
