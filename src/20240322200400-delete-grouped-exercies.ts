import { ApiCache, createMigration, Database, toSqlTuple } from './utils'

const unsupportedEntityTypes = ['grouped-text-exercise']

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache()

    await deleteUnsupportedEntityTypes({ db, apiCache, unsupportedEntityTypes })

    await apiCache.deleteKeysAndQuit()
  },
})

export async function deleteUnsupportedEntityTypes(args: {
  db: Database
  apiCache: ApiCache
  unsupportedEntityTypes: string[]
}) {
  const { db, apiCache, unsupportedEntityTypes } = args

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

  await deleteUuids(db, apiCache, [...entitiesToDelete, ...revisionsToDelete])
  console.log(`INFO: ${entitiesToDelete.length} entities deleted`)
  console.log(`INFO: ${revisionsToDelete.length} revisions deleted`)

  await db.runSql(
    `delete from type where name in ${toSqlTuple(unsupportedEntityTypes)}`,
  )
}

export async function deleteUuids(
  db: Database,
  apiCache: ApiCache,
  uuidsToDelete: { id: number }[],
) {
  if (uuidsToDelete.length > 0) {
    const uuids = uuidsToDelete.map((uuid) => uuid.id)

    const eventLogsToDelete: { id: number }[] = await db.runSql(`
      select distinct event_log.id as id
      from event_log
      left join event_parameter on event_parameter.log_id = event_log.id
      left join event_parameter_uuid on event_parameter_uuid.event_parameter_id = event_parameter.id
      where
        event_log.uuid_id in ${toSqlTuple(uuids)}
        or event_parameter_uuid.uuid_id in ${toSqlTuple(uuids)}
    `)

    await db.runSql(`DELETE FROM uuid WHERE id IN ${toSqlTuple(uuids)}`)

    for (const id of uuids) {
      apiCache.markUuid(id)
    }

    // Make sure that events are also deleted from DB and ApiCache
    await deleteEventLogs(db, apiCache, eventLogsToDelete)
  }
}

export async function deleteEventLogs(
  db: Database,
  apiCache: ApiCache,
  event_logs: { id: number }[],
) {
  if (event_logs.length > 0) {
    const ids = event_logs.map((event_log) => event_log.id)

    await db.runSql(`DELETE FROM event_log WHERE id IN ${toSqlTuple(ids)}`)

    for (const eventId of ids) {
      apiCache.markEvent(eventId)
    }
  }

  await apiCache.markAllNotifications()
}
