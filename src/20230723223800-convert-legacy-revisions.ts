import { convert, Legacy } from '@serlo/legacy-editor-to-editor'
import { createMigration, Database, replacePluginState } from './utils'
import * as t from 'io-ts'
import * as f from 'fp-ts/function'
import { addImageCaption } from './20220517163100-add-image-caption'
import {
  migrateEquationsState,
  LegacyEquationsPluginState,
} from './20201101234700-migrate-equations'
import { addFirstExplanationToEquation } from './20210923155000-add-first-explanation-to-equation'
import { addTransformationTargetToEquation } from './20210923231900-add-transformation-target-to-equations'
import { convertImportantAndBlockquoteToBox } from './20220625202000-convert-important-and-blockquote-to-box'
import { convertTableToSerloTable } from './20230526090001-convert-table-to-serlo-table'

createMigration(module.exports, {
  up: async (db) => {
    try {
      await convertTaxonomyDescriptions(db)
      await convertEntityRevisionFieldValues(db)
      await convertUserDescriptions(db)
      await convertStaticPages(db)
    } catch (error: unknown) {
      logError('General error was thrown', error)
    }
  },
})

async function convertTaxonomyDescriptions(db: Database) {
  type Taxonomy = {
    id: number
    description?: string
  }

  const legacyTaxonomies = await db.runSql<Taxonomy[]>(`
      SELECT id, description FROM term_taxonomy
  `)

  for (const taxonomy of legacyTaxonomies) {
    try {
      const convertedDescription = convertContent(taxonomy.description)
      if (convertedDescription.isConverted) {
        await db.runSql(
          'UPDATE term_taxonomy SET description = ? WHERE id = ?',
          convertedDescription.convertedContent,
          taxonomy.id,
        )
        console.log(`Taxonomy updated: ${taxonomy.id}`)
      }
    } catch (e: unknown) {
      logError('Error in converting taxonomy', e, taxonomy)
    }
  }
}

async function convertUserDescriptions(db: Database) {
  type User = {
    id: number
    description?: string
  }

  // ID is a bot account
  const all_users = await db.runSql<User[]>(`
      SELECT id, description FROM user WHERE id != 191656
  `)

  for (const user of all_users) {
    try {
      const convertedDescription = convertContent(user.description)
      if (convertedDescription.isConverted) {
        await db.runSql(
          'UPDATE user SET description = ? WHERE id = ?',
          convertedDescription.convertedContent,
          user.id,
        )
        console.log(`User updated: ${user.id}`)
      }
    } catch (e: unknown) {
      logError('Error in converting user', e, user)
    }
  }
}

async function convertStaticPages(db: Database) {
  type StaticPage = {
    id: number
    content: string
  }

  const all_page_revisions = await db.runSql<StaticPage[]>(`
      SELECT id, content FROM page_revision
  `)

  for (const page_revision of all_page_revisions) {
    try {
      const newContent = convertContent(page_revision.content)
      if (newContent.isConverted) {
        await db.runSql(
          'UPDATE page_revision set content = ? WHERE id = ?',
          newContent.convertedContent,
          page_revision.id,
        )
        console.log(`Static page revision updated: ${page_revision.id}`)
      }
    } catch (e: unknown) {
      logError('Error in converting static page', e, page_revision)
    }
  }
}

async function convertEntityRevisionFieldValues(db: Database) {
  type Revision = {
    id: number
    entity_revision_id: number
    value: string
  }

  const legacyEntityRevisions = await db.runSql<Revision[]>(`
      SELECT
          entity_revision_field.id, entity_revision_field.entity_revision_id,
          entity_revision_field.value
        FROM entity_revision_field
        JOIN entity_revision on entity_revision_field.entity_revision_id = entity_revision.id
        JOIN entity on entity.id = entity_revision.repository_id
        JOIN type on type.id = entity.type_id
        WHERE
          (entity_revision_field.field = "content" and type.name != "video")
          or field = "reasoning" or field = "description"
  `)

  for (const revision of legacyEntityRevisions) {
    try {
      const convertedRevision = convertContent(revision.value)
      if (convertedRevision.isConverted) {
        await db.runSql(
          'UPDATE entity_revision_field SET value = ? WHERE id = ?',
          convertedRevision.convertedContent,
          revision.id,
        )
        console.log(`Entity revision updated: ${revision.id}`)
      }
    } catch (error: unknown) {
      logError('Error in converting revision field', error, revision)
    }
  }
}

function convertContent(input?: string): ConversionResult {
  if (input == null || input === '') {
    return { isConverted: false }
  }

  let parsedInput = undefined

  try {
    // Why is this needed?
    parsedInput = JSON.parse(input) as unknown
  } catch (error: unknown) {
    parsedInput = undefined
  }

  if (parsedInput != null && typeof parsedInput === 'object') {
    if (isLegacyContent(parsedInput)) {
      const convertedContent = convertWithFollowUps(parsedInput)
      return { isConverted: true, convertedContent }
    } else {
      return { isConverted: false }
    }
  } else {
    // Content is markdown
    const convertedContent = convertWithFollowUps(input)
    return { isConverted: true, convertedContent }
  }
}

const LegacyEquationsState = t.type({
  steps: t.array(
    t.type({
      left: t.type({ plugin: t.literal('text') }),
      right: t.type({ plugin: t.literal('text') }),
      transform: t.type({ plugin: t.literal('text') }),
      sign: t.string,
    }),
  ),
})

const migrateEquations = replacePluginState({
  equation: ({ state }) => {
    if (LegacyEquationsState.is(state)) {
      return migrateEquationsState(
        state as unknown as LegacyEquationsPluginState,
      )
    } else {
      return document
    }
  },
})

// Follow ups:
// run table to serloTable conversion again
// run important and blockquote conversions again
// auto-convert layout plugin to either multimedia or rows plugin
// maybe run add-image-caption mutation again
// maybe run migrate-equations, add-first-explanation-to-equation and add-transformation-target-to-equations again
function convertWithFollowUps(content: string | Legacy) {
  return f.pipe(
    content,
    convert,
    migrateEquations,
    addFirstExplanationToEquation,
    addTransformationTargetToEquation,
    addImageCaption,
    convertImportantAndBlockquoteToBox,
    convertTableToSerloTable,
    JSON.stringify,
  ) as string
}

type ConversionResult =
  | { isConverted: false }
  | { isConverted: true; convertedContent: string }

function isLegacyContent(arg: unknown): arg is Legacy {
  return t.array(t.array(t.type({ col: t.number, content: t.string }))).is(arg)
}

function logError(message: string, error: unknown, context?: unknown) {
  console.error(`ERROR: ${message}`)

  if (error instanceof Error) {
    console.error(error.message)
    if (error.stack) console.error(error.stack)
  }
  if (context != null) {
    console.error('CONTEXT:')
    console.debug(context)
  }
  console.error('END OF ERROR')
}
