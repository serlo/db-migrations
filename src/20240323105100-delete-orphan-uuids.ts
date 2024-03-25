import { ApiCache, Database, SlackLogger, deleteUuids } from './utils'

export async function up(db: Database) {
  const apiCache = new ApiCache()
  const logger = new SlackLogger('20240323105100-delete-orphan-uuids')

  const uuids = await db.runSql<{ id: number }[]>(`
    select
      uuid.id
    from uuid
    where
      (uuid.discriminator  = "comment" and uuid.id not in (select id from comment))
      or (uuid.discriminator = "entity" and uuid.id not in (select id from entity))
      or (uuid.discriminator = "entityRevision" and uuid.id not in (select id from entity_revision))
      or (uuid.discriminator = "page" and uuid.id not in (select id from page_repository))
      or (uuid.discriminator = "pageRevision" and uuid.id not in (select id from page_revision))
      or (uuid.discriminator = "taxonomyTerm" and uuid.id not in (select id from term_taxonomy))
      or (uuid.discriminator = "user" and uuid.id not in (select id from user))
  `)

  await deleteUuids(db, apiCache, uuids)

  await logger.closeAndSend()
  // To reduce the time between deleting the keys and finishing the DB
  // transaction, this should be the last command
  await apiCache.deleteKeysAndQuit()
}
