import { createEdtrIoMigration, replacePluginState } from './utils'

createEdtrIoMigration({
  exports: module.exports,
  migrateState: replacePluginState({
    equations: ({ state }) => {
      if (typeof state !== 'object' || state === null)
        throw new Error('Illegal equation state')

      return { firstExplanation: { plugin: 'text' }, ...state }
    },
  }),
})
