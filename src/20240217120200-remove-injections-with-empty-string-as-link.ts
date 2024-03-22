import * as t from 'io-ts'

import { createSerloEditorMigration, transformPlugins } from './utils'

const InjectionPlugin = t.type({
  plugin: t.literal('injection'),
  state: t.string,
})

createSerloEditorMigration({
  exports,
  log: () => void 0,
  migrationName: 'remove-injections-with-empty-strings',
  migrateState: transformPlugins({
    injection: (plugin) => {
      if (!InjectionPlugin.is(plugin)) {
        return undefined
      }

      const injectionUrl = plugin.state.trim()

      if (['', ')', 'A1'].includes(injectionUrl)) {
        return undefined
      }

      return [plugin]
    },
  }),
})
