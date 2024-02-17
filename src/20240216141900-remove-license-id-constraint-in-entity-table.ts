import { createMigration } from './utils'

createMigration(exports, {
  up: async (db) => {
    await db.runSql(`
        ALTER TABLE entity DROP CONSTRAINT fk_entity_license1;
    `)
  },
})
