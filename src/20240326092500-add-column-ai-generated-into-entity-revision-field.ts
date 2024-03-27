import { ApiCache, Database, SlackLogger } from './utils'

export async function up(db: Database) {
  db.runSql(`
    ALTER TABLE entity_revision_field
    ADD is_meta_description_ai_generated VARCHAR(8) NULL;
  `)
}

export async function down(db: Database) {
  db.runSql(`
    ALTER TABLE is_meta_description_ai_generated DROP COLUMN is_ai_generated;
  `)
}
