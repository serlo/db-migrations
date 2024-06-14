import * as t from 'io-ts'

import { ApiCache, Database, SlackLogger } from './utils'

export async function up(db: Database) {
  const apiCache = new ApiCache()
  const logger = new SlackLogger(
    '20240607193000-simplification-event-of-tables',
  )

  console.log(
    'Starting migration 20240607193000-simplification-event-of-tables',
  )

  for (const columnName of ['uuid_parameter', 'uuid_parameter2']) {
    await db.runSql(`ALTER TABLE event_log ADD ${columnName} BIGINT NULL;`)
    await db.runSql(
      `CREATE INDEX idx_event_${columnName} ON event_log (${columnName});`,
    )
    await db.runSql(`
      ALTER TABLE event_log
      ADD CONSTRAINT fk_event_${columnName}
      FOREIGN KEY (${columnName})
      REFERENCES uuid(id)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `)
    console.log(`Column ${columnName} added to event_log`)
  }
  await db.runSql('ALTER TABLE event_log ADD string_parameter MEDIUMTEXT NULL;')
  console.log('Column string_parameter added to event_log')

  await updateEventTable(db, logger)

  await db.runSql('ALTER TABLE event RENAME TO event_type;')
  await db.runSql(
    'ALTER TABLE event_log RENAME COLUMN event_id TO event_type_id;',
  )
  console.log('Table event renamed to event_type')

  await db.runSql('alter table event_log rename to event')
  await db.runSql(
    'alter table notification_event rename column event_log_id to event_id',
  )
  console.log('Table event_log renamed to event')

  // TODO: Log those tables before dropping them
  await db.runSql('drop table event_parameter_string')
  await db.runSql('drop table event_parameter_uuid')
  await db.runSql('drop table event_parameter')
  await db.runSql('drop table event_parameter_name')

  await logger.closeAndSend()
  // To reduce the time between deleting the keys and finishing the DB
  // transaction, this should be the last command
  await apiCache.deleteKeysAndQuit()
}

enum EventType {
  ArchiveThread = 'discussion/comment/archive',
  RestoreThread = 'discussion/restore',
  CreateComment = 'discussion/comment/create',
  CreateThread = 'discussion/create',
  CreateEntity = 'entity/create',
  SetLicense = 'license/object/set',
  CreateEntityLink = 'entity/link/create',
  RemoveEntityLink = 'entity/link/remove',
  CreateEntityRevision = 'entity/revision/add',
  CheckoutRevision = 'entity/revision/checkout',
  RejectRevision = 'entity/revision/reject',
  CreateTaxonomyLink = 'taxonomy/term/associate',
  RemoveTaxonomyLink = 'taxonomy/term/dissociate',
  CreateTaxonomyTerm = 'taxonomy/term/create',
  SetTaxonomyTerm = 'taxonomy/term/update',
  SetTaxonomyParent = 'taxonomy/term/parent/change',
  RestoreUuid = 'uuid/restore',
  TrashUuid = 'uuid/trash',
}

const DatabaseEventRepresentations = {
  ArchiveThread: getDatabaseRepresentationDecoder({
    type: EventType.ArchiveThread,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
  RestoreThread: getDatabaseRepresentationDecoder({
    type: EventType.RestoreThread,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
  CreateComment: getDatabaseRepresentationDecoder({
    type: EventType.CreateComment,
    uuidParameters: t.type({ discussion: t.number }),
    stringParameters: t.type({}),
  }),
  CreateThread: getDatabaseRepresentationDecoder({
    type: EventType.CreateThread,
    uuidParameters: t.type({ on: t.number }),
    stringParameters: t.type({}),
  }),
  CreateEntity: getDatabaseRepresentationDecoder({
    type: EventType.CreateEntity,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
  SetLicense: getDatabaseRepresentationDecoder({
    type: EventType.SetLicense,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
  CreateEntityLink: getDatabaseRepresentationDecoder({
    type: EventType.CreateEntityLink,
    uuidParameters: t.type({ parent: t.number }),
    stringParameters: t.type({}),
  }),
  RemoveEntityLink: getDatabaseRepresentationDecoder({
    type: EventType.RemoveEntityLink,
    uuidParameters: t.type({ parent: t.number }),
    stringParameters: t.type({}),
  }),
  CreateEntityRevision: getDatabaseRepresentationDecoder({
    type: EventType.CreateEntityRevision,
    uuidParameters: t.type({ repository: t.number }),
    stringParameters: t.type({}),
  }),
  CheckoutRevision: getDatabaseRepresentationDecoder({
    type: EventType.CheckoutRevision,
    uuidParameters: t.type({ repository: t.number }),
    stringParameters: t.type({ reason: t.string }),
  }),
  RejectRevision: getDatabaseRepresentationDecoder({
    type: EventType.RejectRevision,
    uuidParameters: t.type({ repository: t.number }),
    stringParameters: t.type({ reason: t.string }),
  }),
  CreateTaxonomyLink: getDatabaseRepresentationDecoder({
    type: EventType.CreateTaxonomyLink,
    uuidParameters: t.type({ object: t.number }),
    stringParameters: t.type({}),
  }),
  RemoveTaxonomyLink: getDatabaseRepresentationDecoder({
    type: EventType.RemoveTaxonomyLink,
    uuidParameters: t.type({ object: t.number }),
    stringParameters: t.type({}),
  }),
  CreateTaxonomyTerm: getDatabaseRepresentationDecoder({
    type: EventType.CreateTaxonomyTerm,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
  SetTaxonomyTerm: getDatabaseRepresentationDecoder({
    type: EventType.SetTaxonomyTerm,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
  SetTaxonomyParent: getDatabaseRepresentationDecoder({
    type: EventType.SetTaxonomyParent,
    uuidParameters: t.type({
      from: t.union([t.number, t.null]),
      to: t.union([t.number, t.null]),
    }),
    stringParameters: t.type({}),
  }),
  TrashUuid: getDatabaseRepresentationDecoder({
    type: EventType.TrashUuid,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
  RestoreUuid: getDatabaseRepresentationDecoder({
    type: EventType.RestoreUuid,
    uuidParameters: t.type({}),
    stringParameters: t.type({}),
  }),
} as const

type DatabaseEventRepresentation = {
  [P in keyof typeof DatabaseEventRepresentations]: t.TypeOf<
    (typeof DatabaseEventRepresentations)[P]
  >
}[keyof typeof DatabaseEventRepresentations]

const DatabaseEventRepresentation: t.Type<DatabaseEventRepresentation> =
  t.union([
    DatabaseEventRepresentations.ArchiveThread,
    DatabaseEventRepresentations.CheckoutRevision,
    DatabaseEventRepresentations.CreateComment,
    DatabaseEventRepresentations.CreateEntity,
    DatabaseEventRepresentations.CreateEntityLink,
    DatabaseEventRepresentations.CreateEntityRevision,
    DatabaseEventRepresentations.CreateTaxonomyTerm,
    DatabaseEventRepresentations.CreateTaxonomyLink,
    DatabaseEventRepresentations.CreateThread,
    DatabaseEventRepresentations.RejectRevision,
    DatabaseEventRepresentations.RemoveEntityLink,
    DatabaseEventRepresentations.RemoveTaxonomyLink,
    DatabaseEventRepresentations.RestoreThread,
    DatabaseEventRepresentations.RestoreUuid,
    DatabaseEventRepresentations.SetLicense,
    DatabaseEventRepresentations.SetTaxonomyParent,
    DatabaseEventRepresentations.SetTaxonomyTerm,
    DatabaseEventRepresentations.TrashUuid,
  ])

async function updateEventTable(db: Database, logger: SlackLogger) {
  interface Row {
    id: number
  }

  const batchSize = 1000
  let offset = 0
  let rows: Row[] = []

  console.log('Updating event table')

  while (true) {
    console.log(`Processing rows from ${offset} to ${offset + batchSize}`)
    rows = await db.runSql<Row[]>(
      `
        select
          event_log.id as id,
          event.name as type,
          JSON_OBJECTAGG(
            COALESCE(event_parameter_name.name, "__unused"),
            event_parameter_uuid.uuid_id
          ) as uuidParameters,
          JSON_OBJECTAGG(
            COALESCE(event_parameter_name.name, "__unused"),
            event_parameter_string.value
          ) as stringParameters
        from event_log
        join event on event_log.event_id = event.id
        left join event_parameter on event_parameter.log_id = event_log.id
        left join event_parameter_name on event_parameter.name_id = event_parameter_name.id
        left join event_parameter_string on event_parameter_string.event_parameter_id = event_parameter.id
        left join event_parameter_uuid on event_parameter_uuid.event_parameter_id = event_parameter.id
        group by event_log.id
        order by id
        limit ? offset ?
      `,
      batchSize,
      offset,
    )

    for (const row of rows) {
      if (DatabaseEventRepresentation.is(row)) {
        const newData = toNewData(row)

        await db.runSql(
          `
            update event_log
            set uuid_parameter = ?,
                uuid_parameter2 = ?,
                string_parameter = ?
            where id = ?
          `,
          newData.uuidParameter,
          newData.uuidParameter2,
          newData.stringParameter,
          row.id,
        )
      } else {
        // This event is malformed => let's ignore it
        logger.logEvent('malformedEventFound', { event: row })
        console.log('Malformed event found', row)
      }
    }

    if (rows.length === 0) {
      break
    }

    offset += rows.length
  }

  console.log('Event table updated')
}

// Update event table row based on event type
function toNewData(row: DatabaseEventRepresentation) {
  const base: NewData = {
    uuidParameter: null,
    uuidParameter2: null,
    stringParameter: null,
  }

  switch (row.type) {
    case EventType.ArchiveThread:
    case EventType.RestoreThread:
    case EventType.CreateEntity:
    case EventType.SetLicense:
    case EventType.CreateTaxonomyTerm:
    case EventType.SetTaxonomyTerm:
    case EventType.TrashUuid:
    case EventType.RestoreUuid:
      return base
    case EventType.CreateComment:
      return { ...base, uuidParameter: row.uuidParameters.discussion }
    case EventType.CreateThread:
      return { ...base, uuidParameter: row.uuidParameters.on }
    case EventType.CreateEntityLink:
      return { ...base, uuidParameter: row.uuidParameters.parent }
    case EventType.RemoveEntityLink:
      return { ...base, uuidParameter: row.uuidParameters.parent }
    case EventType.CreateEntityRevision:
      return { ...base, uuidParameter: row.uuidParameters.repository }
    case EventType.CheckoutRevision:
      return {
        ...base,
        uuidParameter: row.uuidParameters.repository,
        stringParameter: row.stringParameters.reason,
      }
    case EventType.RejectRevision:
      return {
        ...base,
        uuidParameter: row.uuidParameters.repository,
        stringParameter: row.stringParameters.reason,
      }
    case EventType.CreateTaxonomyLink:
      return { ...base, uuidParameter: row.uuidParameters.object }
    case EventType.RemoveTaxonomyLink:
      return { ...base, uuidParameter: row.uuidParameters.object }
    case EventType.SetTaxonomyParent:
      return {
        ...base,
        uuidParameter: row.uuidParameters.from,
        uuidParameter2: row.uuidParameters.to,
      }
  }
}

interface NewData {
  uuidParameter: number | null
  uuidParameter2: number | null
  stringParameter: string | null
}

function getDatabaseRepresentationDecoder<
  Type extends EventType,
  UuidParameters extends Record<string, number | null>,
  StringParameters extends Record<string, string>,
>({
  type,
  uuidParameters,
  stringParameters,
}: {
  type: Type
  uuidParameters: t.Type<UuidParameters>
  stringParameters: t.Type<StringParameters>
}) {
  return t.type({
    id: t.number,
    type: t.literal(type),
    uuidParameters: uuidParameters,
    stringParameters: stringParameters,
  })
}
