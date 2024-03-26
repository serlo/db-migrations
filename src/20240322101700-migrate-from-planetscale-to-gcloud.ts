import { Database, SlackLogger } from './utils'

export async function up(db: Database) {
  const logger = new SlackLogger('20240323105100-delete-orphan-uuids')

  // Uncomment if for some reason you need to delete the tables

  // await db.runSql(
  //   `DROP TABLE IF EXISTS exercise_submission, ab_testing_data, test_survey, quickbar_stats, prototype_thread_status, private_link_prototype, mitmach_woche, equations_app_stats`,
  // )

  await db.runSql(`
  CREATE TABLE exercise_submission (
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

  await db.runSql(`
  CREATE TABLE ab_testing_data (
    id int NOT NULL AUTO_INCREMENT,
    experiment_group varchar(8) NOT NULL,
    experiment varchar(64) NOT NULL,
    entity_id int NOT NULL,
    type varchar(8) NOT NULL,
    result varchar(8) NOT NULL,
    session_id varchar(64) NOT NULL,
    is_production tinyint(1) NOT NULL,
    timestamp datetime(3) NOT NULL DEFAULT current_timestamp(3),
    topic_id int NOT NULL,
    PRIMARY KEY (id),
    KEY ab_testing_data_experiment_idx (experiment),
    KEY ab_testing_data_entity_id_idx (entity_id),
    KEY ab_testing_data_timestamp_idx (timestamp)
  )
`)

  await db.runSql(`
  CREATE TABLE equations_app_stats (
    id int NOT NULL AUTO_INCREMENT,
    event varchar(255) NOT NULL,
    latex varchar(255) NOT NULL,
    session_id varchar(64) NOT NULL,
    timestamp datetime(3) NOT NULL DEFAULT current_timestamp(3),
    PRIMARY KEY (id),
    KEY equations_app_stats_timestamp_idx (timestamp)
  )
`)

  await db.runSql(`
  CREATE TABLE quickbar_stats (
    id int NOT NULL AUTO_INCREMENT,
    path varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
    query varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
    target varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
    is_subject tinyint(1) NOT NULL,
    timestamp datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (id),
    KEY quickbar_stats_timestamp_idx (timestamp)
  )
`)
  await logger.closeAndSend()
}
