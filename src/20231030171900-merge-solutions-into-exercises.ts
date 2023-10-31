import * as t from 'io-ts'

import { Database, createMigration } from './utils'
import { ApiCache } from './utils/api-cache'

const SolutionContentDecoder = t.type({
  plugin: t.literal('solution'),
  state: t.record(t.string, t.unknown),
})
const ExerciseContentDecoder = t.type({
  plugin: t.literal('exercise'),
  state: t.record(t.string, t.unknown),
})
const RowPluginDecoder = t.type({ plugin: t.literal('rows') })

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache()
    const batchSize = 5000
    let entities: Entity[] = []

    do {
      const lastId = entities.at(-1)?.entityId ?? 0
      entities = await db.runSql<Entity[]>(
        `select
           entity.id as entityId,
           entity.license_id as licenseId,
           entity.current_revision_id as currentRevisionId
         from entity
         join type on entity.type_id = type.id
         where type.name = "text-exercise"
         and entity.id > ?
         order by entity.id limit ?`,
        lastId,
        batchSize,
      )

      for (const entity of entities) {
        await updateExercise(db, apiCache, entity)
      }
    } while (entities.length > 0)

    await apiCache.quit()
  },
})

async function updateExercise(
  db: Database,
  apiCache: ApiCache,
  exercise: Entity,
) {
  // TODO: Fix this case
  if (exercise.currentRevisionId == null) return

  const solution = await getSolution(db, exercise)

  if (solution === null) return

  let exerciseContent = await getContent(db, exercise)

  if (RowPluginDecoder.is(exerciseContent)) {
    exerciseContent = {
      plugin: 'exercise',
      state: { content: exerciseContent },
    }
  }

  if (!ExerciseContentDecoder.is(exerciseContent)) {
    throw new Error(
      `Illegal content for exercise ${exercise.entityId} with current revision ${exercise.currentRevisionId}`,
    )
  }

  if (exerciseContent.state.solution != null) return

  let solutionContent = await getContent(db, solution)

  if (solutionContent == null) return

  if (RowPluginDecoder.is(solutionContent)) {
    solutionContent = {
      plugin: 'solution',
      state: {
        strategy: { plugin: 'text' },
        steps: solutionContent,
      },
    }
  }

  if (!SolutionContentDecoder.is(solutionContent)) {
    throw new Error(
      `Illegal content for solution ${solution.entityId} with current revision ${solution.currentRevisionId}`,
    )
  }

  if (exercise.licenseId !== solution.licenseId) {
    solutionContent.state['licenseId'] = solution.licenseId
  }

  exerciseContent.state['solution'] = solutionContent

  await db.runSql(
    ` update entity_revision_field set value = ?
      where entity_revision_id = ? and field = "content"`,
    JSON.stringify(exerciseContent),
    exercise.currentRevisionId,
  )

  await apiCache.deleteUuid(exercise.currentRevisionId)
}

async function getSolution(db: Database, entity: Entity) {
  // TODO: There are exercises with more than 1 solution -> fix it...
  const result = await db.runSql<Entity[]>(
    ` select
        solution.id as entityId,
        solution.license_id as licenseId,
        solution.current_revision_id as currentRevisionId
      from entity_link
      join entity solution on solution.id = entity_link.child_id
      join type solution_type on solution.type_id = solution_type.id
      where
        solution_type.name = "text-solution"
        and entity_link.parent_id = ?
      limit 1`,
    entity.entityId,
  )

  if (result.length === 1) {
    return result[0]
  } else if (result.length === 0) {
    return null
  } else {
    throw new Error(`Exercise ${entity.entityId} has more than one solution`)
  }
}

async function getContent(db: Database, entity: Entity) {
  if (entity.currentRevisionId == null) return null

  const result = await db.runSql<{ content: string }[]>(
    ` select value as content
      from entity_revision_field
      where entity_revision_id = ? and field = "content"`,
    entity.currentRevisionId,
  )

  if (result.length === 1) {
    return JSON.parse(result[0].content) as unknown
  } else {
    throw new Error(
      `Revision ${entity.currentRevisionId} has more than one or no content`,
    )
  }
}

interface Entity {
  entityId: number
  licenseId: number
  currentRevisionId?: number
}
