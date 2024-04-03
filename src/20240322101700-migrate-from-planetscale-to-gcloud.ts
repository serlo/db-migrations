import { Database, SlackLogger } from './utils'

export async function up(db: Database) {
  await db.runSql(`
  CREATE TABLE IF NOT EXISTS exercise_submission (
    id int NOT NULL AUTO_INCREMENT,
    path varchar(1024) NOT NULL,
    entity_id int NOT NULL,
    revision_id int NOT NULL,
    type varchar(8) NOT NULL,
    result varchar(255) NOT NULL,
    timestamp datetime(3) NOT NULL DEFAULT current_timestamp(3),
    session_id varchar(64) NOT NULL,
    PRIMARY KEY (id),
    KEY exercise_submission_entity_id_idx (entity_id),
    KEY exercise_submission_timestamp_idx (timestamp),
    KEY exercise_submission_path_idx (path(50))
  )
`)
}
