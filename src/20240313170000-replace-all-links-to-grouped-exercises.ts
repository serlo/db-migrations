import * as t from 'io-ts'
import * as R from 'ramda'

import {
  ApiCache,
  createMigration,
  migrateSerloEditorContent,
  transformPlugins,
} from './utils'

const TextPlugin = t.type({
  plugin: t.literal('text'),
})

interface Group {
  groupedExercise: number
  exerciseGroup: number
}

const Link = t.type({
  type: t.literal('a'),
  href: t.string,
  children: t.array(t.unknown),
})

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache()

    const groups = await db.runSql<Group[]>(`
      SELECT
        entity.id AS groupedExercise,
        ent2.id AS exerciseGroup
      FROM entity
      JOIN entity_link ON entity.id = entity_link.child_id
      JOIN entity ent2 ON entity_link.parent_id = ent2.id
      JOIN uuid u1 ON u1.id = entity.id
      JOIN uuid u2 ON u2.id = ent2.id
      WHERE entity.type_id = 5;
    `)

    await migrateSerloEditorContent({
      apiCache,
      db,
      migrationName: 'replace-all-links-to-grouped-exercises',
      migrateState: transformPlugins({
        text: (plugin) => {
          if (!TextPlugin.is(plugin)) return undefined

          const pluginState = plugin.state as Array<{
            type: string
            children: Array<unknown>
          }>
          if (!pluginState || !pluginState.length) return [plugin]

          const clonedState = structuredClone(pluginState)

          replaceLinks(clonedState, groups)

          if (!R.equals(clonedState, pluginState)) {
            return [{ ...plugin, state: clonedState }]
          }

          return [plugin]
        },
      }),
    })

    await apiCache.quit()
  },
})

function replaceLinks(object: object, groups: Group[]) {
  if (Link.is(object)) {
    const startsWithSlash = object.href.at(0) === '/'
    const containsSerlo = object.href.includes('serlo')
    const isAnAttachment = object.href.startsWith('/attachment/')

    const slug = object.href.substring(object.href.lastIndexOf('/') + 1)

    if ((startsWithSlash || containsSerlo) && !isAnAttachment) {
      groups.forEach((exercise) => {
        if (exercise.groupedExercise.toString() !== slug) return

        console.log(
          'link to grouped exercise replaced with its exercise group: ',
          { initialHrefValue: object.href, ...exercise },
        )
        object.href = object.href.replace(
          exercise.groupedExercise.toString(),
          exercise.exerciseGroup.toString(),
        )
      })
    }
  }

  Object.values(object).forEach((value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      replaceLinks(value, groups)
    }
  })
}
