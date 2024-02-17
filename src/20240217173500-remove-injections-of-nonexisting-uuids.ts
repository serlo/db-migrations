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

    /*
    interface Row {
      groupedExerciseId: number
      exerciseId: number
    }

    const groupedExercises = await db.runSql<Row[]>(`
      select
        child.id as groupedExerciseId, parent.id as exerciseId
      from entity child
      join type child_type on child.type_id = child_type.id
      join entity_link on entity_link.child_id = child.id
      join entity parent on entity_link.parent_id = parent.id
      join type parent_type on parent.type_id = parent_type.id
      where
        child_type.name = "grouped-text-exercise"
        and parent_type.name = "text-exercise-group"
    `)

    const groupedExerciseIds = groupedExercises.map((x) => x.groupedExerciseId)
    */

    const rows = await db.runSql<{ id: number }[]>('select id from uuid')
    const uuids = rows.map((x) => x.id)

    await migrateSerloEditorContent({
      apiCache,
      db,
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
