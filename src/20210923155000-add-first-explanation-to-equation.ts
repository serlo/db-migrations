import { createEdtrIoMigration, replacePluginState } from './utils'

export const addFirstExplanationToEquation = replacePluginState({
  equations: ({ state }) => {
    if (typeof state !== 'object' || state === null)
      throw new Error('Illegal equation state')

    return { firstExplanation: { plugin: 'text' }, ...state }
  },
})

createEdtrIoMigration({
  exports: module.exports,
  migrateState: addFirstExplanationToEquation,
})
