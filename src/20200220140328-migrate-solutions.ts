import { createMigration } from './utils'

/**
 * Migrates the Edtr.io states of all entities of type `text-solution`.
 * THIS IS AN IRREVERSIBLE MIGRATION!
 */
createMigration(module.exports, {
  up: async (db) => {
    interface Row {
      id: number
      value: string
    }

    async function processResults(results: Row[]) {
      if (results.length === 0) return

      const [field, ...remainingResults] = results
      const state = JSON.parse(field.value)
      await db.runSql(
        `UPDATE entity_revision_field SET value = ? WHERE id = ?`,
        JSON.stringify(migrateState(state)),
        field.id,
      )
      await processResults(remainingResults)
    }

    const results = await db.runSql<Row[]>(`
      SELECT erf.id, erf.value
      FROM entity_revision_field erf
        LEFT JOIN entity_revision er on erf.entity_revision_id = er.id
        LEFT JOIN entity e on er.repository_id = e.id
      WHERE erf.field = 'content'
        AND erf.value LIKE '{"plugin"%'
        AND e.type_id = (SELECT id FROM type WHERE name = 'text-solution')
    `)
    await processResults(results)
  },
})

export function migrateState(state: {
  state: { plugin: string; state: any }[]
}) {
  const stepsState = state.state.map(({ plugin, state }) => {
    if (plugin !== 'solutionSteps') return state
    const children = []
    const { introduction, strategy, solutionSteps, additionals } = state
    if (introduction && introduction.plugin === 'rows') {
      children.push(...introduction.state)
    }
    if (introduction && introduction.plugin === 'text') {
      children.push(introduction)
    }
    if (strategy && strategy.plugin === 'rows') {
      children.push(...strategy.state)
    }
    solutionSteps.forEach((step: any) => {
      if (step.content && step.content.plugin === 'rows') {
        children.push(...step.content.state)
      }
    })
    if (additionals && additionals.plugin === 'rows') {
      children.push(...additionals.state)
    }
    return children
  })

  return {
    plugin: 'solution',
    state: {
      prerequisite: undefined,
      strategy: {
        plugin: 'text',
      },
      steps: {
        plugin: 'rows',
        state: [].concat(...stepsState),
      },
    },
  }
}
