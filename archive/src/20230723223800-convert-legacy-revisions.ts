import { convert, Legacy } from '@serlo/legacy-editor-to-editor'
import {
  createMigration,
  Database,
  replacePluginState,
  transformPlugins,
} from './utils'
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
import { ApiCache } from './utils/api-cache'

const throwErrors = true

createMigration(module.exports, {
  up: async (db) => {
    try {
      const apiCache = new ApiCache()

      await convertTaxonomyDescriptions(db, apiCache)
      await convertEntityRevisionFieldValues(db, apiCache)
      await convertUserDescriptions(db, apiCache)
      await convertStaticPages(db, apiCache)

      await apiCache.quit()
    } catch (error: unknown) {
      logError('General error was thrown', error)

      if (throwErrors) throw error
    }
  },
})

async function convertTaxonomyDescriptions(db: Database, apiCache: ApiCache) {
  await runConversion({
    contentType: 'taxonomy term',
    querySql: `
      SELECT id, id as revision_id, description as content
      FROM term_taxonomy WHERE id > ?
    `,
    updateSql: 'UPDATE term_taxonomy SET description = ? WHERE id = ?',
    db,
    apiCache,
  })
}

async function convertUserDescriptions(db: Database, apiCache: ApiCache) {
  await runConversion({
    contentType: 'user',
    querySql: `
      SELECT id, id as revision_id, description as content
      FROM user WHERE id != 191656 and description != "NULL" and id > ?
    `,
    updateSql: 'UPDATE user SET description = ? WHERE id = ?',
    db,
    apiCache,
  })
}

async function convertStaticPages(db: Database, apiCache: ApiCache) {
  await runConversion({
    contentType: 'static page revision',
    querySql: `
      SELECT id, id as revision_id, content FROM page_revision
      WHERE id > ?
    `,
    updateSql: 'UPDATE page_revision set content = ? WHERE id = ?',
    db,
    apiCache,
  })
}

async function convertEntityRevisionFieldValues(
  db: Database,
  apiCache: ApiCache,
) {
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
          ((entity_revision_field.field = "content" and type.name != "video")
          or field = "reasoning" or field = "description")
          and type.name not in ("input-expression-equal-match-challenge",
            "input-number-exact-match-challenge", "input-string-normalized-match-challenge",
            "math-puzzle", "multiple-choice-right-answer", "multiple-choice-wrong-answer",
            "single-choice-right-answer", "single-choice-wrong-answer")
          and entity_revision_field.id > ?
  `,
    updateSql: 'UPDATE entity_revision_field SET value = ? WHERE id = ?',
    db,
    apiCache,
  })
}

async function runConversion(args: {
  querySql: string
  updateSql: string
  contentType: string
  db: Database
  apiCache: ApiCache
  batchSize?: number
}) {
  const { querySql, updateSql, contentType, batchSize = 5000 } = args
  const { db, apiCache } = args

  type Row = {
    id: number
    revision_id: number
    content: string
  }

  let rows: Row[] = []

  do {
    const querySqlWithLimit = querySql + ` ORDER BY id limit ${batchSize}`
    const afterId = rows.at(-1)?.id ?? 0
    rows = await db.runSql<Row[]>(querySqlWithLimit, afterId)

    console.log(`Consume batch ${afterId} ... ${rows.at(-1)?.id ?? 0}`)

    for (const row of rows) {
      try {
        console.log(`Try to convert ${contentType}: ${row.revision_id}`)
        const convertedRevision = convertContent(row.content)
        if (convertedRevision.isConverted) {
          await db.runSql(updateSql, convertedRevision.convertedContent, row.id)
          console.log(`${contentType} updated: ${row.revision_id}`)
          await apiCache.deleteUuid(row.revision_id)
        }
      } catch (error: unknown) {
        logError(`Error in converting ${contentType}`, error, row)
        if (throwErrors) throw error
      }
    }
  } while (rows.length != 0)
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

export const migrateEquations = replacePluginState({
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

const PluginDecoder = t.type({ plugin: t.string, state: t.unknown })

const RowsPluginDecoder = t.type({
  plugin: t.literal('rows'),
  state: t.array(PluginDecoder),
})

const LayoutPluginDecoder = t.type({
  plugin: t.literal('layout'),
  state: t.array(
    t.type({
      width: t.number,
      child: t.unknown,
    }),
  ),
})

export const removeLayoutPlugins = transformPlugins({
  layout: (value) => {
    if (LayoutPluginDecoder.is(value)) {
      return value.state.flatMap(({ child }) => {
        if (RowsPluginDecoder.is(child)) {
          return child.state
        } else if (PluginDecoder.is(child)) {
          return [child]
        } else {
          throw new Error(
            `Illegal value (remove layout plugin): ${JSON.stringify(value)}`,
          )
        }
      })
    } else {
      throw new Error(
        `Illegal value (remove layout plugin): ${JSON.stringify(value)}`,
      )
    }
  },
})

const removeEmptyTextPlugins = transformPlugins({
  text: (value) => {
    if (getSlateText(value).trim() === '') {
      return []
    }
  },
})

const BoxPluginStateDecoder = t.type({
  content: t.type({ plugin: t.literal('rows'), state: t.array(t.unknown) }),
})

const removeEmptyBoxPlugins = transformPlugins({
  box: (value) => {
    if (
      BoxPluginStateDecoder.is(value.state) &&
      value.state.content.state.length === 0
    ) {
      return []
    }
  },
})

function getSlateText(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(getSlateText).join('')
  }

  if (t.type({ text: t.string }).is(value)) {
    return value.text
  }

  if (t.type({ type: t.literal('math'), src: t.string }).is(value)) {
    return value.src
  }

  if (typeof value == 'object' && value != null) {
    return Object.values(value).map(getSlateText).join('')
  }

  return ''
}

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
    removeLayoutPlugins,
    removeEmptyTextPlugins,
    removeEmptyBoxPlugins,
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
