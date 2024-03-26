import * as t from 'io-ts'
import * as R from 'ramda'

import {
  ApiCache,
  Database,
  migrateSerloEditorContent,
  transformPlugins,
} from './utils'

const TextPlugin = t.type({
  plugin: t.literal('text'),
  state: t.array(t.unknown),
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

export async function up(db: Database) {
  const apiCache = new ApiCache()

  const groups = await db.runSql<Group[]>(`
      SELECT
        entity.id AS groupedExercise,
        ent2.id AS exerciseGroup
      FROM entity
      JOIN entity_link ON entity.id = entity_link.child_id
      JOIN entity ent2 ON entity_link.parent_id = ent2.id
      WHERE entity.type_id = 5;
    `)

  await migrateSerloEditorContent({
    apiCache,
    db,
    migrationName: 'replace-all-links-to-grouped-exercises',
    migrateState: transformPlugins({
      text: (plugin) => {
        if (!TextPlugin.is(plugin)) return undefined

        const pluginState = plugin.state
        if (!pluginState || !pluginState.length) return undefined

        const clonedState = structuredClone(pluginState)

        replaceLinks(clonedState, groups)

        if (!R.equals(clonedState, pluginState)) {
          return [{ ...plugin, state: clonedState }]
        }

        return [plugin]
      },
    }),
  })

  await apiCache.deleteKeysAndQuit()
}

function replaceLinks(object: object, groups: Group[]) {
  if (Link.is(object)) {
    const startsWithSlash = object.href.at(0) === '/'
    const containsSerlo = object.href.includes('serlo')
    const isAnAttachment = object.href.startsWith('/attachment/')

    const slug = object.href.substring(object.href.lastIndexOf('/') + 1)

    if ((startsWithSlash || containsSerlo) && !isAnAttachment) {
      groups.forEach((exercise) => {
        const groupedExerciseId = exercise.groupedExercise.toString()
        const exerciseGroupId = exercise.exerciseGroup.toString()

        if (groupedExerciseId !== slug) return

        console.log(
          'link to grouped exercise replaced with its exercise group: ',
          { initialHrefValue: object.href, ...exercise },
        )
        object.href = object.href.replace(
          groupedExerciseId,
          `${exerciseGroupId}#${groupedExerciseId}`,
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
