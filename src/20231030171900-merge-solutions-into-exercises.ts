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
        // as a strategy
        plugin: t.union([t.literal('text'), t.literal('box')]),
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
    const apiCache = new ApiCache()
    const batchSize = 5000
    let entities: Row[] = []

    do {
      const lastId = entities.at(-1)?.entityId ?? 0
      entities = await db.runSql<Row[]>(
        `select
           entity.id as entityId
         from entity
         join type on entity.type_id = type.id
         where type.name = "text-exercise"
         and entity.id > ?
         order by entity.id limit ?`,
        lastId,
        batchSize,
      )

      for (const entity of entities) {
        await updateExercise(db, apiCache, entity.entityId)

        // TODO
        break
      }

      // TODO
      break
    } while (entities.length > 0)

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
  const exercise = await loadEntityTree(db, exerciseId)
  const newRevisions = transformEntity(exercise)

  for (const revision of newRevisions) {
    console.log('---')
    printTree((x) => (x == null ? 'null' : x.id), revision.current)
  }
}

function transformEntity(
  entity: TreeNode<EntityWithRevisions>,
): TransformResult[] {
  let previous: TreeNode<EntityWithRevision | null> = mapTree(
    () => null,
    entity,
  )
  let rest = entity
  let result: TransformResult[] = []

  while (getValues(rest).some((entity) => entity.revisions.length > 0)) {
    const dates = getValues(rest)
      .map((entity) => entity.revisions.at(0)?.date ?? null)
      .filter(isNotNull)
    const minDate = dates.reduce((a, b) => (a <= b ? a : b))

    const splitResult = split(rest, minDate)

    result.push({ previous, current: splitResult.current })

    previous = splitResult.current
    rest = splitResult.rest
  }

  return result
}

interface TransformResult {
  previous: TreeNode<EntityWithRevision | null>
  current: TreeNode<EntityWithRevision | null>
}

function split(
  node: TreeNode<EntityWithRevisions>,
  date: Date,
): {
  current: TreeNode<EntityWithRevision | null>
  rest: TreeNode<EntityWithRevisions>
} {
  let currentValue: EntityWithRevision | null
  let restValue: EntityWithRevisions

  if (
    node.value.revisions.length > 0 &&
    node.value.revisions[0].date.getTime() < date.getTime() + 10
  ) {
    const base = {
      id: node.value.id,
      licenseId: node.value.licenseId,
      typeName: node.value.typeName,
    }
    currentValue = { ...base, revision: node.value.revisions[0] }
    restValue = { ...base, revisions: node.value.revisions.slice(1) }
  } else {
    currentValue = null
    restValue = node.value
  }

  const children = node.children.map((child) => split(child, date))
  const currentChildren = children.map((x) => x.current)
  const restChildren = children.map((x) => x.rest)

  return {
    current: { value: currentValue, children: currentChildren },
    rest: { value: restValue, children: restChildren },
  }
}

async function loadEntityTree(
  db: Database,
  entityId: number,
): Promise<TreeNode<EntityWithRevisions>> {
  const entity = await loadEntity(db, entityId)
  let childIds: number[] = []

  if (entity.typeName === TypeName.ExerciseType) {
    childIds = await loadChildrenIds({
      db,
      entityId: entityId,
      childType: TypeName.SolutionType,
      limit: 1,
    })
  }

  const children = await Promise.all(
    childIds.map((childId) => loadEntityTree(db, childId)),
  )

  return { value: entity, children }
}

async function loadChildrenIds({
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
      select child_id as childId
      from entity_link
      join entity child on child.id = entity_link.child_id
      join type child_type on child_type.id = child.type_id
      where parent_id = ? and child_type.name = ?`

  if (limit != null) sqlCommand += ` limit ${limit}`

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
        type.name as typeName
      from entity
      join type on entity.type_id = type.id
      where entity.id = ?`,
    entityId,
  )
  const entityBase = pickFirst(entityBaseResult)

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

function mapTree<A, B>(mapper: (x: A) => B, node: TreeNode<A>): TreeNode<B> {
  return {
    value: mapper(node.value),
    children: node.children.map((child) => mapTree(mapper, child)),
  }
}

function getValues<V>(node: TreeNode<V>): V[] {
  return [node.value, ...node.children.flatMap(getValues)]
}

function pickFirst<A>(elements: A[]): A {
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
  typeName: TypeName
}

enum TypeName {
  ExerciseType = 'text-exercise',
  SolutionType = 'text-solution',
}

function isTypeName(values: string): values is TypeName {
  return Object.values<string>(TypeName).includes(values)
}

function isNotNull<A>(value: A | null): value is A {
  return value != null
}

function printTree<V>(mapper: (x: V) => unknown, node: TreeNode<V>, level = 0) {
  let result = ''

  for (let i = 0; i < level; i++) result += ' '

  result += String(mapper(node.value))

  console.log(result)

  for (const child of node.children) {
    printTree(mapper, child, level + 1)
  }
}
