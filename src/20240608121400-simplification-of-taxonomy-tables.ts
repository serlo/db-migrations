import { ApiCache, Database, SlackLogger } from './utils'

export async function up(db: Database) {
  const apiCache = new ApiCache()
  const logger = new SlackLogger(
    '20240608121400-simplification-of-taxonomy-tables',
  )

  await mergeTaxonomyTable(db)
  await mergeTermTable(db)

  await db.runSql(`ALTER TABLE term_taxonomy RENAME TO taxonomy`)

  await logger.closeAndSend()
  // To reduce the time between deleting the keys and finishing the DB
  // transaction, this should be the last command
  await apiCache.deleteKeysAndQuit()
}

async function mergeTaxonomyTable(db: Database) {
  console.log('Adding type_id to term_taxonomy')

  await db.runSql(`ALTER TABLE term_taxonomy ADD COLUMN type_id INT`)
  await db.runSql(`
    ALTER TABLE term_taxonomy ADD CONSTRAINT fk_taxonomy_type
    FOREIGN KEY (type_id) REFERENCES type(id)
    ON DELETE CASCADE ON UPDATE CASCADE
  `)

  interface Row {
    id: number
    typeId: number | null
  }

  const batchSize = 1000
  let offset = 0
  let rows: Row[] = []

  while (true) {
    console.log(`Fetching rows from ${offset} to ${offset + batchSize}`)
    rows = await db.runSql(
      `SELECT
        term_taxonomy.id AS id,
        taxonomy.type_id AS typeId
      FROM term_taxonomy
      LEFT JOIN taxonomy ON term_taxonomy.taxonomy_id = taxonomy.id
      ORDER BY term_taxonomy.id
      LIMIT ? OFFSET ?`,
      batchSize,
      offset,
    )

    if (rows.length === 0) {
      break
    }

    for (const row of rows) {
      if (row.typeId === null) {
        throw new Error(`No type found for taxonomy ${row.id}`)
      }

      await db.runSql(
        `UPDATE term_taxonomy SET type_id = ? WHERE id = ?`,
        row.typeId,
        row.id,
      )
    }

    offset += batchSize
  }

  console.log('Dropping taxonomy table')
  await db.runSql(
    'ALTER TABLE term_taxonomy DROP FOREIGN KEY fk_term_taxonomy_taxonomy1;',
  )
  await db.runSql(`ALTER TABLE term_taxonomy DROP COLUMN taxonomy_id`)
  await db.runSql(`DROP TABLE taxonomy`)
}

async function mergeTermTable(db: Database) {
  console.log('Adding name and instance_id to term_taxonomy')

  await db.runSql(`ALTER TABLE term_taxonomy ADD COLUMN instance_id INT`)
  await db.runSql(`ALTER TABLE term_taxonomy ADD COLUMN name varchar(255)`)
  await db.runSql(`
    ALTER TABLE term_taxonomy ADD CONSTRAINT fk_taxonomy_instance
    FOREIGN KEY (instance_id) REFERENCES instance(id)
    ON DELETE CASCADE ON UPDATE CASCADE
  `)

  interface Row {
    id: number
    instanceId: number | null
    name: string | null
  }

  const batchSize = 1000
  let offset = 0
  let rows: Row[] = []

  while (true) {
    console.log(`Fetching rows from ${offset} to ${offset + batchSize}`)
    rows = await db.runSql(
      `SELECT
        term_taxonomy.id AS id,
        term.name AS name,
        term.instance_id AS instanceId
      FROM term_taxonomy
      LEFT JOIN term ON term_taxonomy.term_id = term.id
      ORDER BY term_taxonomy.id
      LIMIT ? OFFSET ?`,
      batchSize,
      offset,
    )

    if (rows.length === 0) {
      break
    }

    for (const row of rows) {
      if (row.name === null || row.instanceId === null) {
        throw new Error(
          `IllegalState: No name / instance_id found for taxonomy ${row.id}`,
        )
      }

      await db.runSql(
        `UPDATE term_taxonomy SET instance_id = ?, name = ? WHERE id = ?`,
        row.instanceId,
        row.name,
        row.id,
      )
    }

    offset += batchSize
  }

  console.log('Dropping term table')
  await db.runSql(
    'ALTER TABLE term_taxonomy DROP INDEX uq_term_taxonomy_unique;',
  )
  await db.runSql(
    'ALTER TABLE term_taxonomy DROP FOREIGN KEY fk_term_taxonomy_term1;',
  )
  await db.runSql(`ALTER TABLE term_taxonomy DROP COLUMN term_id`)
  await db.runSql(`DROP TABLE term`)
}
