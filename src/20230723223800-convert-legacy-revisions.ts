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
  await runConversion({
    contentType: 'taxonomy term',
    querySql: `
      SELECT id, id as revision_id, description as content
      FROM term_taxonomy
    `,
    updateSql: 'UPDATE term_taxonomy SET description = ? WHERE id = ?',
    db,
  })
}

async function convertUserDescriptions(db: Database) {
  await runConversion({
    contentType: 'user',
    querySql: `
      SELECT id, id as revision_id, description as content
      FROM user WHERE id != 191656
    `,
    updateSql: 'UPDATE user SET description = ? WHERE id = ?',
    db,
  })
}

async function convertStaticPages(db: Database) {
  await runConversion({
    contentType: 'static page revision',
    querySql: `
      SELECT id, id as revision_id, content FROM page_revision
    `,
    updateSql: 'UPDATE page_revision set content = ? WHERE id = ?',
    db,
  })
}

async function convertEntityRevisionFieldValues(db: Database) {
  await runConversion({
    contentType: 'entity revision',
    querySql: `
      SELECT
          entity_revision_field.id as id,
          entity_revision_field.entity_revision_id as revision_id,
          entity_revision_field.value as content
        FROM entity_revision_field
        JOIN entity_revision on entity_revision_field.entity_revision_id = entity_revision.id
        JOIN entity on entity.id = entity_revision.repository_id
        JOIN type on type.id = entity.type_id
        WHERE
          (entity_revision_field.field = "content" and type.name != "video")
          or field = "reasoning" or field = "description"
  `,
    updateSql: 'UPDATE entity_revision_field SET value = ? WHERE id = ?',
    db,
  })
}

async function runConversion(args: {
  querySql: string
  updateSql: string
  contentType: string
  db: Database
}) {
  const { querySql, updateSql, contentType, db } = args

  type Row = {
    id: number
    revision_id: number
    content: string
  }

  const rows = await db.runSql<Row[]>(querySql)

  for (const row of rows) {
    try {
      const convertedRevision = convertContent(row.content)
      if (convertedRevision.isConverted) {
        await db.runSql(updateSql, convertedRevision.convertedContent, row.id)
        console.log(`${contentType} updated: ${row.id}`)
      }
    } catch (error: unknown) {
      logError(`Error in converting ${contentType}`, error, row)
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
