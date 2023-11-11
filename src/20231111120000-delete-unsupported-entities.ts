import { createMigration } from './utils'

createMigration(exports, {
  up: async (db) => {
    const entitiesToDelete: { id: number }[] = await db.runSql(`
      select entity.id as id
      from entity
      join type on entity.type_id = type.id
      where type.name in ("input-expression-equal-match-challenge",
        "input-number-exact-match-challenge", "input-string-normalized-match-challenge",
        "math-puzzle", "multiple-choice-right-answer", "multiple-choice-wrong-answer",
        "single-choice-right-answer", "single-choice-wrong-answer")
    `)

    if (entitiesToDelete.length > 0) {
      const entitiesList = entitiesToDelete.map((item) => item.id).join(', ')

      await db.runSql(`DELETE FROM uuid WHERE id IN (${entitiesList})`)
    }
  },
})
