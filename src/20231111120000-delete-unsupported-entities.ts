import { ApiCache, Database, createMigration } from './utils'

const unsupportedEntityTypes = [
  'input-expression-equal-match-challenge',
  'input-number-exact-match-challenge',
  'input-string-normalized-match-challenge',
  'math-puzzle',
  'multiple-choice-right-answer',
  'multiple-choice-wrong-answer',
  'single-choice-right-answer',
  'single-choice-wrong-answer',
]

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache()

    const entitiesToDelete: { id: number }[] = await db.runSql(`
      select entity.id as id
      from entity
      join type on entity.type_id = type.id
      where type.name in ${toSqlTuple(unsupportedEntityTypes)}
    `)
    const revisionsToDelete: { id: number }[] = await db.runSql(`
      select entity_revision.id as id
      from entity_revision
      join entity on entity_revision.repository_id = entity.id
      join type on entity.type_id = type.id
      where type.name in ${toSqlTuple(unsupportedEntityTypes)}
    `)
    const uuidsToDelete = getUuidsToDelete(entitiesToDelete, revisionsToDelete)
    const eventLogsToDelete: { id: number }[] = await db.runSql(`
      select distinct event_log.id as id
      from event_log
      left join event_parameter on event_parameter.log_id = event_log.id
      left join event_parameter_uuid on event_parameter_uuid.event_parameter_id = event.parameter_id
      where
        event_log.uuid_id in ${uuidsToDelete}
        or event_parameter_uuid.uuid_id in ${uuidsToDelete}
    `)

    await deleteUuids(db, apiCache, entitiesToDelete)
    console.log(`INFO: ${entitiesToDelete.length} entities deleted`)

    // Let's avoid having revisions not pointing to an apropriate entity
    await deleteUuids(db, apiCache, revisionsToDelete)
    console.log(`INFO: ${revisionsToDelete.length} revisions deleted`)

    await deleteEventLogs(db, eventLogsToDelete)
    console.log(`INFO: ${eventLogsToDelete.length} event logs deleted`)

    await db.runSql(
      `delete from type where name in ${toSqlTuple(unsupportedEntityTypes)}`,
    )

    await apiCache.quit()
  },
})

function toSqlTuple(elements: Array<string | number>): string {
  return '(' + elements.map((e) => JSON.stringify(e)).join(', ') + ')'
}

async function deleteUuids(
  db: Database,
  apiCache: ApiCache,
  uuids: { id: number }[],
) {
  if (uuids.length > 0) {
    const ids = uuids.map((uuid) => uuid.id)
    await db.runSql(`DELETE FROM uuid WHERE id IN ${toSqlTuple(ids)}`)

    for (const id of ids) {
      await apiCache.deleteUuid(id)
    }
  }
}

async function deleteEventLogs(
  db: Database,
  // apiCache: ApiCache,
  event_logs: { id: number }[],
) {
  if (event_logs.length > 0) {
    const ids = event_logs.map((event_log) => event_log.id)
    await db.runSql(`DELETE FROM event_log WHERE id IN ${toSqlTuple(ids)}`)

    // TODO: Not sure if event logs are cached
  }
}

function getUuidsToDelete(
  entities: { id: number }[],
  revisions: { id: number }[],
) {
  const ids = [...entities, ...revisions].map((uuid) => uuid.id)
  return toSqlTuple(ids)
}
