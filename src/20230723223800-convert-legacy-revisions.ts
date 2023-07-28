import { convert, Edtr, Legacy } from './utils/legacy-editor-to-editor'
import { createMigration } from './utils'

// Follow ups:
// run table to serloTable conversion again
// run important and blockquote conversions again
// auto-convert layout plugin to either multimedia or rows plugin
// maybe run add-image-caption mutation again
// maybe run migrate-equations, add-first-explanation-to-equation and add-transformation-target-to-equations again

createMigration(module.exports, {
  up: async (db) => {
    const result = await db.runSql<{ id: number; description: string }[]>(`
      SELECT id, description
      FROM term_taxonomy
      WHERE description LIKE '[%'
      LIMIT 1
      `)
    //console.log(result)
    //const convertedDescriptions = result.map(row => convertOrReturnInput(row.description))

    const response = await db.runSql<
      { id: number; entity_revision_id: number; value: string }[]
    >(`
      SELECT id, entity_revision_id, value
      FROM entity_revision_field
      WHERE field = 'content' AND value LIKE '[%'
      LIMIT 1
    `)

    console.log(response)
    response.map((row) => convertOrReturnInput(row.value))
  },
})

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

    const legacy = input as Legacy
    // fixes https://github.com/serlo/frontend/issues/1563

    const sanitized = JSON.parse(JSON.stringify(legacy).replace(/```/g, ''))
    console.log(`sanitized content: ${sanitized}`)
    const converted = convert(sanitized) as Edtr
    console.log(`converted content ${converted}`)

    const serialized =
      !converted || typeof converted === 'string'
        ? converted
        : JSON.stringify(converted)

    return serialized
  }

  // fallback
  return input
}
