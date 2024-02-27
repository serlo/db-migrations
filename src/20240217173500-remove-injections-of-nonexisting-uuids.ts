import * as t from 'io-ts'

import {
  ApiCache,
  createMigration,
  migrateSerloEditorContent,
  transformPlugins,
} from './utils'

const InjectionPlugin = t.type({
  plugin: t.literal('injection'),
  state: t.string,
})

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache()

    const rows = await db.runSql<{ id: number }[]>('select id from uuid')
    const uuids = rows.map((x) => x.id)

    await migrateSerloEditorContent({
      apiCache,
      db,
      migrationName: 'remove-injections-of-nonexisting-uuids',
      migrateState: transformPlugins({
        injection: (plugin) => {
          if (!InjectionPlugin.is(plugin)) {
            return undefined
          }

          const match = /^\/?(\d+)$/.exec(plugin.state)

          if (match) {
            const uuid = parseInt(match[1])

            if (!Number.isNaN(uuid) && !uuids.includes(uuid)) {
              console.log(`Delete injection with uuid ${uuid}`)
              return undefined
            }
          }

          return [plugin]
        },
      }),
    })

    await apiCache.quit()
  },
})
