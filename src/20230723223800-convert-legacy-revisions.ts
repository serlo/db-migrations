import { convert, Edtr } from '@serlo/legacy-editor-to-editor'
import { createMigration, Database } from './utils'

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
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message)
        console.error(e.stack)
      }
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
    const convertedDescription = convertOrReturnInput(taxonomy.description)
    if (convertedDescription) {
      await db.runSql(`
          UPDATE term_taxonomy
            SET description = '${escapeMySQL(convertedDescription)}'
            WHERE id = ${taxonomy.id}
      `)
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
    const convertedRevision = convertOrReturnInput(revision.value)
    if (convertedRevision) {
      await db.runSql(`
          UPDATE entity_revision_field
            SET value = '${escapeMySQL(convertedRevision)}'
            WHERE id = ${revision.id}
      `)
    }
  }
}

function convertOrReturnInput(input?: string) {
  if (!input) {
    return input
    // should we return undefined / '' or something like this?
    // { plugin: 'rows', state: [{ plugin: 'text' }] }
  }

  // probably editor state already
  if (input?.startsWith('{')) return input

  if (input?.startsWith('[')) {
    // Legacy editor state

    const sanitized = JSON.parse(input.replace(/```/g, ''))
    const converted = convert(sanitized) as Edtr

    return !converted ? converted : JSON.stringify(converted)
  }

  // fallback
  return input
}

function escapeMySQL(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}
