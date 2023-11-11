import { createMigration } from './utils'

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
    const entitiesToDelete: { id: number }[] = await db.runSql(`
      select entity.id as id
      from entity
      join type on entity.type_id = type.id
      where type.name in ${toSqlTuple(unsupportedEntityTypes)}
    `)

    if (entitiesToDelete.length > 0) {
      const ids = entitiesToDelete.map((entity) => entity.id)
      await db.runSql(`DELETE FROM uuid WHERE id IN ${toSqlTuple(ids)}`)
    }
  },
})

function toSqlTuple(elements: Array<string | number>): string {
  return '(' + elements.map((e) => JSON.stringify(e)).join(', ') + ')'
}
