import { zip } from 'fp-ts/Array'
import * as t from 'io-ts'

import { Database, createMigration } from './utils'
import { ApiCache } from './utils/api-cache'
import assert from 'assert'

const SolutionContentDecoder = t.type({
  plugin: t.literal('solution'),
  state: t.intersection([
    t.type({
      steps: t.type({
        plugin: t.literal('rows'),
      }),
      strategy: t.type({
        // TODO: We need another migration to fix solutions with a box
        // or an image as strategy
        plugin: t.union([
          t.literal('text'),
          t.literal('box'),
          t.literal('image'),
        ]),
      }),
    }),
    t.partial({ licenseId: t.number }),
  ]),
})
const ExerciseContentDecoder = t.type({
  plugin: t.literal('exercise'),
  state: t.record(t.string, t.unknown),
})
const RowPluginDecoder = t.type({ plugin: t.literal('rows') })

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache({ enableLogging: false })

    const batchSize = 5000
    let entities: Row[] = []

    do {
      const lastUpdatedEntityId = entities.at(-1)?.entityId ?? 0

      entities = await db.runSql<Row[]>(
        `select
           entity.id as entityId
         from entity
         join type on entity.type_id = type.id
         where type.name in ("text-exercise", "grouped-text-exercise")
         and entity.id > ?
         order by entity.id limit ?`,
        lastUpdatedEntityId,
        batchSize,
      )

      for (const entity of entities) {
        await updateExercise(db, apiCache, entity.entityId)
      }
    } while (entities.length > 0)

    await apiCache.deleteUnrevisedRevisions()
    await apiCache.quit()

    interface Row {
      entityId: number
    }
  },
})

async function updateExercise(
  db: Database,
  apiCache: ApiCache,
  exerciseId: number,
) {
  // Load the tree of the exercise. It is either only the exercise (without the
  // solution / without any children):
  //
  //    [ exercise ]
  //
  // or it an exercise with a solution (children of root is a singleton list):
  //
  //    [ exercise ]
  //      └ [ solution ]
  //
  // Next to the entity in the node the list of revisions are stored:
  //
  //    [ exercise ]:      [ e1, e2, e3, ...]
  //      └ [ solution ]   [ s1, s2, s3, ...]
  const exerciseNode = await loadEntityNode(db, exerciseId)

  // When an exercise does not have any revision there is no transformation
  // possible even if the solution has revisions.
  if (exerciseNode.value.revisions.length === 0) return

  const exercise = exerciseNode.value
  const solution = exerciseNode.children.at(0)?.value ?? null

  // Skip when exercise or grouped exercise entity does not have any solution
  if (solution === null) return

  // From the tree of revisions we calculate the list of overall edits
  // to the exercise and its solution. We represent an edit as a tree with the
  // same structure as the exercise. The value for exercise / solution is
  // a revision (type `EntityWithRevision`) when the exercise / solution was
  // edited or `null` when it was not edited. So let's assume the entity
  // tree with the revisions has the structure
  //
  //    [ exercise ]       [ edit_on_date1 | edit_on_date2 ]
  //      └ [ solution ]   [ edit_on_date1 | edit_on_date3 ]
  //
  // Then the list of edits are
  //
  // [ edit_on_date1 ]     | [ edit_on_date2 ] | [ null ]
  //   └ [ edit_on_date2 ] |   └ [ null ]      |   └ [ edit_on_date3 ]
  const edits = getEdits(exerciseNode)

  if (edits.length > 0 && edits[0].value == null) {
    console.log(
      `Warning: Exercise ${exerciseId} has a revision for a solution before first revision of the exercise`,
    )
  }

  // When the solution has a revision before the exercise we use the first
  // revision of the exercise as the content for the exercise
  const fallbackExercise = edits.filter((r) => r.value != null).at(0)

  assert(
    fallbackExercise?.value != null,
    `Illegal state: baseExercise is null for ${exerciseId}`,
  )

  // Here we store the current version of the exercise after each edit. We
  // start with exercise = solution = null
  let currentVersion: TreeNode<EntityWithRevision | null> = mapTree(
    () => null,
    exerciseNode,
  )

  for (const edit of edits) {
    // Add the edit to the current version
    currentVersion = concatTree(
      (a, b) => (b == null ? a : b),
      currentVersion,
      edit,
    )

    const currentExercise = currentVersion.value ?? fallbackExercise.value
    const currentSolution = currentVersion.children.at(0)?.value ?? null

    let exerciseContent = JSON.parse(
      currentExercise?.revision?.content ?? 'null',
    ) as unknown
    const solutionContentText = currentSolution?.revision?.content ?? null

    // When the solution is empty we do not need to migrate anything...
    //
    // Note: Some revisions for solutions have an empty string
    if (solutionContentText === null || solutionContentText === '') continue
    let solutionContent = JSON.parse(solutionContentText)

    // No need for a migration
    if (solutionContent == null || currentSolution == null) continue

    // Should not happen with our fallback exercise...
    assert(exerciseContent != null, 'Illegal state: Exercise is null')

    if (RowPluginDecoder.is(exerciseContent)) {
      exerciseContent = {
        plugin: 'exercise',
        state: { content: exerciseContent },
      }
    }

    if (!ExerciseContentDecoder.is(exerciseContent)) {
      throw new Error(
        `Illegal content for exercise ${exerciseId} with current revision ${currentExercise.revision.id}`,
      )
    }

    // When we already have added a solution to the exercise -> Do not update
    // again
    if (exerciseContent.state.solution != null) continue

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
        `Illegal content for solution ${currentSolution?.id} with current revision ${currentSolution?.revision?.id}`,
      )
    }

    if (currentExercise.licenseId !== currentSolution.licenseId) {
      solutionContent.state['licenseId'] = currentSolution.licenseId
    }

    exerciseContent.state['solution'] = solutionContent

    if (edit.value != null) {
      // In this edit an exercise revision was added -> We can change the
      // content of it
      //
      await migrate(
        db,
        ` update entity_revision_field set value = ?
          where entity_revision_id = ? and field = "content"`,
        JSON.stringify(exerciseContent),
        edit.value.revision.id,
      )

      await apiCache.deleteUuid(edit.value.revision.id)
    } else {
      // In this edit the exercise was not changed -> Let's use the revision
      // of the solution and change it to a revision of the exercise.
      const revisionToOvertake = getValues(edit).filter(isNotNull).at(0)

      // This should not happen
      assert(revisionToOvertake !== undefined)

      await migrate(
        db,
        ` update entity_revision set repository_id = ?
          where id = ?`,
        exerciseId,
        revisionToOvertake.revision.id,
      )

      // We need to update the current revision of the solution -> Otherwise
      // staging would try to load the revision which results in an error
      if (
        revisionToOvertake.currentRevisionId === revisionToOvertake.revision.id
      ) {
        await migrate(
          db,
          ` update entity set current_revision_id = NULL
            where id = ?`,
          revisionToOvertake.id,
        )
      }

      await migrate(
        db,
        ` update entity_revision_field set value = ?
          where entity_revision_id = ? and field = "content"`,
        JSON.stringify(exerciseContent),
        revisionToOvertake.revision.id,
      )

      await apiCache.deleteUuid(currentSolution.id)
      await apiCache.deleteUuid(revisionToOvertake.revision.id)
    }
  }

  await moveCommentsFromSolutionToExercise({
    db,
    apiCache,
    exercise,
    solution,
  })

  await updateCurrentRevisionOfExercise({
    db,
    apiCache,
    exercise,
    solution,
  })

  await apiCache.deleteUuid(exercise.id)
  await apiCache.deleteUuid(solution.id)
}

async function updateCurrentRevisionOfExercise({
  db,
  apiCache,
  exercise,
  solution,
}: {
  db: Database
  apiCache: ApiCache
  exercise: EntityBase
  solution: EntityBase
}) {
  if (
    solution.currentRevisionId != null &&
    solution.currentRevisionId > (exercise.currentRevisionId ?? 0)
  ) {
    await db.runSql(
      `update entity set current_revision_id = ? where id = ?`,
      solution.currentRevisionId,
      exercise.id,
    )

    await apiCache.deleteUuid(exercise.id)
  }
}

async function moveCommentsFromSolutionToExercise({
  db,
  apiCache,
  exercise,
  solution,
}: {
  db: Database
  apiCache: ApiCache
  exercise: EntityBase
  solution: EntityBase
}) {
  const commentsOfSolution = await db.runSql<{ id: number }[]>(
    `select id from comment where uuid_id = ?`,
    solution.id,
  )

  await db.runSql(
    `update comment set uuid_id = ? where uuid_id = ?`,
    exercise.id,
    solution.id,
  )

  for (const comment of commentsOfSolution) {
    await apiCache.deleteUuid(comment.id)
  }

  await apiCache.deleteThreadIds(exercise.id)
  await apiCache.deleteThreadIds(solution.id)
}

/**
 * Returns list of all edits by the following algorithm:
 *
 *    while (there are still revisions in the exercise or the solution) {
 *      // 1. Take the min date of all revisions
 *
 *      // 2. For exercise and solutions split the first revision from it's
 *      //    list of revisions if it's date is less than minDate + 10 seconds
 *    }
 */
function getEdits(
  entity: TreeNode<EntityWithRevisions>,
): TreeNode<EntityWithRevision | null>[] {
  let remainingRevisions = entity
  let edits: TreeNode<EntityWithRevision | null>[] = []

  while (
    getValues(remainingRevisions).some((entity) => entity.revisions.length > 0)
  ) {
    const firstDates = getValues(remainingRevisions)
      .map((entity) => entity.revisions.at(0)?.date ?? null)
      .filter(isNotNull)
    const minDate = firstDates.reduce((a, b) => (a <= b ? a : b))

    const nextEdit = splitNextEdit(remainingRevisions, minDate)

    edits.push(nextEdit.nextEdit)

    remainingRevisions = nextEdit.remainingRevisions
  }

  return edits
}

function splitNextEdit(
  node: TreeNode<EntityWithRevisions>,
  date: Date,
): {
  nextEdit: TreeNode<EntityWithRevision | null>
  remainingRevisions: TreeNode<EntityWithRevisions>
} {
  let nextEditRevision: EntityWithRevision | null
  let remainingRevisions: EntityWithRevisions

  if (
    node.value.revisions.length > 0 &&
    node.value.revisions[0].date.getTime() < date.getTime() + 10
  ) {
    const base = {
      id: node.value.id,
      licenseId: node.value.licenseId,
      typeName: node.value.typeName,
      currentRevisionId: node.value.currentRevisionId,
    }
    nextEditRevision = { ...base, revision: node.value.revisions[0] }
    remainingRevisions = { ...base, revisions: node.value.revisions.slice(1) }
  } else {
    nextEditRevision = null
    remainingRevisions = node.value
  }

  const children = node.children.map((child) => splitNextEdit(child, date))
  const nextEditChildren = children.map((x) => x.nextEdit)
  const remainingRevisionsChildren = children.map((x) => x.remainingRevisions)

  return {
    nextEdit: { value: nextEditRevision, children: nextEditChildren },
    remainingRevisions: {
      value: remainingRevisions,
      children: remainingRevisionsChildren,
    },
  }
}

async function loadEntityNode(
  db: Database,
  entityId: number,
): Promise<TreeNode<EntityWithRevisions>> {
  const entity = await loadEntity(db, entityId)
  let childIds: number[] = []

  if (
    entity.typeName === TypeName.ExerciseType ||
    entity.typeName === TypeName.GroupedExerciseType
  ) {
    childIds = await loadEntityChildrenIds({
      db,
      entityId: entityId,
      childType: TypeName.SolutionType,
      limit: 1,
    })
  }

  const children = await Promise.all(
    childIds.map((childId) => loadEntityNode(db, childId)),
  )

  return { value: entity, children }
}

async function loadEntityChildrenIds({
  db,
  entityId,
  childType,
  limit,
}: {
  db: Database
  entityId: number
  childType: TypeName
  limit?: number
}): Promise<number[]> {
  let sqlCommand = `
      select entity_link.child_id as childId
      from entity_link
      join entity child on child.id = entity_link.child_id
      join type child_type on child_type.id = child.type_id
      join uuid child_uuid on child_uuid.id = child.id
      where
        entity_link.parent_id = ? and child_type.name = ?
        and child_uuid.trashed = 0
      order by entity_link.order ASC`

  if (limit != null) {
    sqlCommand += ` limit ${limit}`
  }

  const result = await db.runSql<{ childId: number }[]>(
    sqlCommand,
    entityId,
    childType,
  )

  return result.map((row) => row.childId)
}

async function loadEntity(
  db: Database,
  entityId: number,
): Promise<EntityWithRevisions> {
  const entityBaseResult = await db.runSql<EntityBase[]>(
    ` select
        entity.id as id,
        entity.license_id as licenseId,
        entity.current_revision_id as currentRevisionId,
        type.name as typeName
      from entity
      join type on entity.type_id = type.id
      where entity.id = ?`,
    entityId,
  )
  const entityBase = pickSingleton(entityBaseResult)

  assert(
    isTypeName(entityBase.typeName),
    `Entity ${entityId} has unsupported type name`,
  )

  const revisions = await loadRevisions(db, entityId)

  return { ...entityBase, revisions }
}

async function loadRevisions(
  db: Database,
  entityId: number,
): Promise<Revision[]> {
  return await db.runSql<Revision[]>(
    ` select
          entity_revision.id,
          entity_revision.date,
          entity_revision_field.value as content
      from entity_revision
      left join entity_revision_field on
          entity_revision_field.entity_revision_id = entity_revision.id
          and entity_revision_field.field = "content"
      where entity_revision.repository_id = ?
      order by entity_revision.date`,
    entityId,
  )
}

/**
 * Lifts a function from the value of the tree to the tree itself. Similar to
 * how `map` is defined for lists.
 */
function mapTree<A, B>(mapper: (x: A) => B, node: TreeNode<A>): TreeNode<B> {
  return {
    value: mapper(node.value),
    children: node.children.map((child) => mapTree(mapper, child)),
  }
}

/**
 * Lifts an operation on the value of a tree to the tree itself. When `concat`
 * for example is an operation on a type `A`, then `concatTree` can be used
 * to get an operation on `TreeNode<A>` by applying `concat` to all values.
 * Thereby we check that both trees have the same structure.
 */
function concatTree<A>(
  concat: (x: A, y: A) => A,
  x: TreeNode<A>,
  y: TreeNode<A>,
): TreeNode<A> {
  // In our case the structure of both trees should always be the same.
  assert(
    x.children.length === y.children.length,
    'Illegal state: Both nodes should have the same number of children.',
  )

  return {
    value: concat(x.value, y.value),
    children: zip(x.children, y.children).map(([x, y]) =>
      concatTree(concat, x, y),
    ),
  }
}

function getValues<V>(node: TreeNode<V>): V[] {
  return [node.value, ...node.children.flatMap(getValues)]
}

function pickSingleton<A>(elements: A[]): A {
  assert(elements.length === 1, 'List has more than one element')

  return elements[0]
}

interface TreeNode<ValueType> {
  value: ValueType
  children: TreeNode<ValueType>[]
}

interface EntityWithRevisions extends EntityBase {
  revisions: Revision[]
}

interface EntityWithRevision extends EntityBase {
  revision: Revision
}

interface Revision {
  id: number
  date: Date
  content: string
}

interface EntityBase {
  id: number
  licenseId: number
  currentRevisionId: number | null
  typeName: TypeName
}

enum TypeName {
  ExerciseType = 'text-exercise',
  GroupedExerciseType = 'grouped-text-exercise',
  SolutionType = 'text-solution',
}

function isTypeName(values: string): values is TypeName {
  return Object.values<string>(TypeName).includes(values)
}

function isNotNull<A>(value: A | null): value is A {
  return value != null
}

// I added this function so that I can easily outcomment all mutations in order
// to avoid a rollback of the DB. -- Kulla
async function migrate(
  db: Database,
  sql: string,
  ...args: unknown[]
): Promise<void> {
  await db.runSql(sql, ...args)
}
