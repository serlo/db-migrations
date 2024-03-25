import { createMigration } from './utils'

createMigration(exports, {
  up: async (db) => {
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
      CREATE TABLE mitmach_woche (
        id int NOT NULL AUTO_INCREMENT,
        path varchar(1024) NOT NULL,
        is_production tinyint(1) NOT NULL,
        event varchar(24) NOT NULL,
        timestamp datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (id)
      )
    `)

    await db.runSql(`
      CREATE TABLE private_link_prototype (
        link_key varchar(64) NOT NULL,
        id int NOT NULL,
        content text NOT NULL,
        title varchar(128) NOT NULL,
        timestamp datetime(3) NOT NULL DEFAULT current_timestamp(3),
        UNIQUE KEY private_link_prototype_key_key (link_key)
      )
    `)

    await db.runSql(`
      CREATE TABLE prototype_thread_status (
        thread_id varchar(24) NOT NULL,
        status varchar(24) NOT NULL,
        PRIMARY KEY (thread_id)
      )`)

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

    await db.runSql(`
      CREATE TABLE test_survey (
        id int NOT NULL AUTO_INCREMENT,
        path varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
        is_production tinyint(1) NOT NULL,
        event varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
        timestamp datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (id)
      )
    `)
  },
  down: async (db) => {
    await db.runSql(
      `DROP TABLE IF EXISTS exercise_submission, ab_testing_data, test_survey, quickbar_stats, prototype_thread_status, private_link_prototype, mitmach_woche, equations_app_stats`,
    )
  },
})
