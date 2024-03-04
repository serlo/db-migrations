import { createMigration } from './utils'

createMigration(exports, {
  up: async (db) => {
    await db.runSql(`
      DELETE FROM url_alias WHERE alias = 'mathe-pruefungen'
      `)
  },
})
