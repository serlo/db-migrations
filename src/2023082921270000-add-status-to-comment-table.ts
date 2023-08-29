import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await db.runSql(`
      CREATE TABLE IF NOT EXISTS comment_status (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `)

    await db.runSql(`
      INSERT INTO comment_status (id, name)
      VALUES
        (1, "no_status"),
        (2, "open"),
        (3, "done");
    `)

    await db.runSql(`
      ALTER TABLE comment
      ADD COLUMN comment_status_id INT DEFAULT 2 NOT NULL;
    `)

    await db.runSql(`
      ALTER TABLE comment
      ADD CONSTRAINT fk_comment_status FOREIGN KEY (comment_status_id) REFERENCES comment_status (id);
    `)

    await db.runSql(`
      UPDATE comment SET comment_status_id = 1 WHERE date <= Date("2023-07-19")
    `)
  },
})
