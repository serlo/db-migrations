import * as t from 'io-ts'

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

          replaceLinks(pluginState, groups)

          return [plugin]
        },
      }),
    })

    await apiCache.quit()
  },
})

function replaceLinks(object: object, groups: Group[]) {
  if (Link.is(object)) {
    groups.forEach((exercise) => {
      const link = object
      const startsWithSlash = link.href.at(0) === '/'
      const containsSerlo = link.href.includes('serlo')
      const isAnAttachment = link.href.startsWith('/attachment/')

      const slug = link.href.substring(link.href.lastIndexOf('/') + 1)

      if (!startsWithSlash && !containsSerlo) return
      if (isAnAttachment) return
      if (exercise.groupedExercise.toString() !== slug) return

      object.href = object.href.replace(
        exercise.groupedExercise.toString(),
        exercise.exerciseGroup.toString(),
      )
    })
  }

  Object.values(object).forEach((value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      replaceLinks(value, groups)
    }
  })
}
