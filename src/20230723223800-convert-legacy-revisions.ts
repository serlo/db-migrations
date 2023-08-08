import { convert, Legacy } from '@serlo/legacy-editor-to-editor'
import { createMigration, Database } from './utils'
import * as t from 'io-ts'

// Follow ups:
// run table to serloTable conversion again
// run important and blockquote conversions again
// auto-convert layout plugin to either multimedia or rows plugin
// maybe run add-image-caption mutation again
// maybe run migrate-equations, add-first-explanation-to-equation and add-transformation-target-to-equations again

createMigration(module.exports, {
  up: async (db) => {
    try {
      await convertTaxonomyDescriptions(db)
      await convertEntityRevisionFieldValues(db)
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
      SELECT id, description
        FROM term_taxonomy
        WHERE description LIKE '[%'
  `)

  for (const taxonomy of legacyTaxonomies) {
    try {
      const convertedDescription = convertContent(taxonomy.description)
      if (convertedDescription.isConverted) {
        const newDescription = escapeMySQL(
          convertedDescription.convertedContent,
        )
        await db.runSql(`
          UPDATE term_taxonomy
            SET description = '${newDescription}'
            WHERE id = ${taxonomy.id}
        `)
        console.log(`converted taxonomy: ${taxonomy.id}`)
      }
    } catch (e: unknown) {
      logError('Error in converting taxonomy', e, taxonomy)
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
      SELECT id, entity_revision_id, value
        FROM entity_revision_field
        WHERE field = 'content' AND value LIKE '[%'
  `)

  for (const revision of legacyEntityRevisions) {
    try {
      const convertedRevision = convertContent(revision.value)
      if (convertedRevision.isConverted) {
        await db.runSql(`
          UPDATE entity_revision_field
            SET value = '${escapeMySQL(convertedRevision.convertedContent)}'
            WHERE id = ${revision.id}
        `)
        console.log(`converted revision field: ${revision.entity_revision_id}`)
      }
    } catch (error: unknown) {
      logError('Error in converting revision field', error, revision)
    }
  }
}

function convertContent(input?: string): ConversionResult {
  if (!input) {
    return { isConverted: false }
  }

  let parsedInput

  try {
    parsedInput = JSON.parse(input.replace(/```/g, ''))
  } catch (error: unknown) {
    // content is no JSON -> cannot be converted
    return { isConverted: false }
  }

  if (isLegacyContent(parsedInput)) {
    const convertedContent = JSON.stringify(convert(parsedInput))
    return { isConverted: true, convertedContent }
  } else {
    return { isConverted: false }
  }
}

type ConversionResult =
  | { isConverted: false }
  | { isConverted: true; convertedContent: string }

function isLegacyContent(arg: unknown): arg is Legacy {
  return t.array(t.array(t.type({ col: t.number, content: t.string }))).is(arg)
}

function escapeMySQL(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
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
