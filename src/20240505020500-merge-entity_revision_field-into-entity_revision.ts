import { ApiCache, Database, SlackLogger } from './utils'

export async function up(db: Database) {
  const apiCache = new ApiCache()
  const logger = new SlackLogger(
    '20240505020500-merge-entity_revision_field-into-entity_revision',
  )

  console.log('start altering table')
  await db.runSql(`ALTER TABLE entity_revision ADD content LONGTEXT NULL;`)
  await db.runSql(
    `ALTER TABLE entity_revision ADD meta_title VARCHAR(255) NULL;`,
  )
  await db.runSql(`ALTER TABLE entity_revision ADD meta_description TEXT NULL;`)
  await db.runSql(`ALTER TABLE entity_revision ADD title VARCHAR(255) NULL;`)
  await db.runSql(`ALTER TABLE entity_revision ADD url TEXT NULL;`)
  await db.runSql(`ALTER TABLE entity_revision ADD changes TEXT NULL;`)
  console.log('end altering table')

  let count = 0

  while (true) {
    interface Row {
      revisionId: number
      params: Record<string, string | null>
    }

    console.log({ count })
    const rows = await db.runSql<Row[]>(
      `
        select
          entity_revision_id as revisionId,
          JSON_OBJECTAGG(field, value) as params
        from entity_revision_field
        group by entity_revision_field.entity_revision_id
        order by revisionId
        limit 1000 offset ?
      `,
      count,
    )

    for (const { revisionId, params } of rows) {
      await db.runSql(
        `
          update entity_revision
            set content = ?, meta_title = ?, title = ?,
                meta_description = ?, changes = ?, url = ?
            where id = ?
        `,
        [
          params['content'] ?? null,
          params['meta_title'] ?? null,
          params['title'] ?? null,
          params['meta_description'] ? params['meta_description'] : params['description'] ? params['description'] : null,
          params['changes'] ? params['changes'] : params['reasoning'] ? params['reasoning'] : null,
          params['url'] ?? null,
          revisionId,
        ],
      )
    }

    if (rows.length === 0) break
    count += rows.length
  }

  console.log('fixing the video revisions')
  // see https://github.com/serlo/api.serlo.org/issues/1610
  await db.runSql(
    `
    update entity_revision
      set url = content, content = meta_description
      where id in (
        select er.id from (select * from entity_revision) as er
          join entity on repository_id = entity.id
          where type_id = 6
      )
    `,
  )

  await db.runSql(
    `
    update entity_revision
      set content =  '{"plugin":"rows","state":[{"plugin":"text"}]}'
      where url is not null
        and (content is null or content = '');
    `,
  )

  console.log('dropping entity_revision_field table')
  await db.dropTable('entity_revision_field')

  await logger.closeAndSend()
  // To reduce the time between deleting the keys and finishing the DB
  // transaction, this should be the last command
  await apiCache.deleteKeysAndQuit()
}
