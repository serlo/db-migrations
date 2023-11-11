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

    await deleteUuids(db, apiCache, entitiesToDelete)
    console.log(`INFO: ${entitiesToDelete.length} entities deleted`)

    // Let's avoid having revisions not pointing to an apropriate entity
    await deleteUuids(db, apiCache, revisionsToDelete)
    console.log(`INFO: ${revisionsToDelete.length} revisions deleted`)

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
