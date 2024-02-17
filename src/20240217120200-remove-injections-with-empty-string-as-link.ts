import * as t from 'io-ts'

import { createEdtrIoMigration, transformPlugins } from './utils'

const InjectionPlugin = t.type({
  plugin: t.literal('injection'),
  state: t.string,
})

createEdtrIoMigration({
  exports,
  migrateState: transformPlugins({
    injection: (plugin) => {
      if (!InjectionPlugin.is(plugin)) {
        return undefined
      }

      if (plugin.state.trim() === '') {
        console.log({ plugin })
        return undefined
      }

      return [plugin]
    },
  }),
})
