import * as t from 'io-ts'

import { createEdtrIoMigration, transformPlugins } from './utils'

const InjectionPlugin = t.type({
  plugin: t.literal('injection'),
  state: t.string,
})

createEdtrIoMigration({
  exports,
  log: () => void 0,
  migrateState: transformPlugins({
    injection: (plugin) => {
      if (!InjectionPlugin.is(plugin)) {
        return undefined
      }

      if (plugin.state.trim() === '') {
        return undefined
      }

      return [plugin]
    },
  }),
})
