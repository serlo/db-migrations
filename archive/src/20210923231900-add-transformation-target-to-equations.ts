import { createEdtrIoMigration, replacePluginState } from './utils'

export const addTransformationTargetToEquation = replacePluginState({
  equations: ({ state }) => {
    if (typeof state !== 'object' || state === null)
      throw new Error('Illegal equation state')

    return { transformationTarget: 'equation', ...state }
  },
})

createEdtrIoMigration({
  exports: module.exports,
  migrateState: addTransformationTargetToEquation,
})
