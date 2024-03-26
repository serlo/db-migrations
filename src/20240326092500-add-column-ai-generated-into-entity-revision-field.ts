import { ApiCache, Database, SlackLogger } from './utils'

export async function up(db: Database) {
  db.runSql(`
    ALTER TABLE entity_revision_field
    ADD is_ai_generated INT NOT NULL DEFAULT 0;
  `)
}

export async function down(db: Database) {
  db.runSql(`
    ALTER TABLE entity_revision_field DROP COLUMN is_ai_generated;
  `)
}
