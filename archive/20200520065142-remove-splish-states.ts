import { convertSplishToEdtrIO } from './legacy-editor-to-editor'

import { createMigration } from '../src/utils'

/**
 * Migrates the remaining Splish Editor states to Edtr.io states
 * THIS IS AN IRREVERSIBLE MIGRATION!
 */
createMigration(exports, {
  up: async (db) => {
    interface Row {
      id: number
      value: string
    }

    async function processResults(results: Row[]) {
      if (results.length === 0) return

      const [field, ...remainingResults] = results
      const state = JSON.parse(field.value)
      let convertedState
      try {
        convertedState = JSON.stringify(convertSplishToEdtrIO(state))
      } catch (err) {
        await processResults(remainingResults)
        return
      }
      await db.runSql(
        `UPDATE entity_revision_field SET value = ? WHERE id = ?`,
        convertedState,
        field.id,
      )
      await processResults(remainingResults)
    }

    const results = await db.runSql<Row[]>(`
      SELECT erf.id, erf.value
      FROM entity_revision_field erf
        LEFT JOIN entity_revision er ON erf.entity_revision_id = er.id
      WHERE erf.value LIKE '{"id":%@splish-me%'
    `)
    await processResults(results)
  },
})
