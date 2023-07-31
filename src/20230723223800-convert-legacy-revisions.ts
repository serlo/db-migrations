import {convert, Edtr, Legacy} from './utils/legacy-editor-to-editor'
import {createMigration} from './utils'

// Follow ups:
// run table to serloTable conversion again
// run important and blockquote conversions again
// auto-convert layout plugin to either multimedia or rows plugin
// maybe run add-image-caption mutation again
// maybe run migrate-equations, add-first-explanation-to-equation and add-transformation-target-to-equations again


type Taxonomy = {
  id: number
  description: string | undefined
}

createMigration(module.exports, {
  up: async (db) => {
    const legacyTaxonomies = await db.runSql<Taxonomy[]>(`
      SELECT id, description
      FROM term_taxonomy
      WHERE description LIKE '[%'
      LIMIT 600
      `)
    //console.log(result)

    for (const taxonomy of legacyTaxonomies) {
      //console.log(taxonomy.id)
      const convertedDescription = convertOrReturnInput(taxonomy.description)
      if (convertedDescription) {
        //console.log(`conv: ${convertedDescription}`)
        // example description that will be sanitized:
        // {"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"[[{"col":24,"content":"* Eigenschaften von Exponentialfunktionen\n* e-Funktion\n* NatÃ¼rliche Logarithmusfunktion\n* Differentialgleichungen des Typs "},{"type":"math","src":"f'(x) = k f(x)","inline":true,"children":[{"text":"f'(x) = k f(x)"}]},{"text":" (GK)\n"}]]"}]}]}]}
        const sanitizedDescription = convertedDescription.replaceAll("'", "\\'")
        //console.log(`conv: ${sanitizedDescription}`)
        await db.runSql(`
          UPDATE term_taxonomy
          SET description = '${sanitizedDescription}'
          WHERE id = ${taxonomy.id}
        `)
      }
    }

    type Revision = {
      id: number
      entity_revision_id: number
      value: string
    }

    const legacyEntityRevisions = await db.runSql<
      Revision[]
    >(`
      SELECT id, entity_revision_id, value
      FROM entity_revision_field
      WHERE field = 'content' AND value LIKE '[%' AND entity_revision_id = 2036
      LIMIT 1
    `)

    //console.log(response)
    for (const revision of legacyEntityRevisions) {
      console.log(`revisionID: ${revision.entity_revision_id}`)
      const convertedRevision = convertOrReturnInput(revision.value)
      if (convertedRevision) {
        console.log(`conv: ${convertedRevision}`)
        // example description that will be sanitized:
        // {"col":12,"content":"\n\nm %%Syntax error from line 1 column 394 to line 1 column 448. Unexpected 'lspace'.%%"}
        const sanitizedRevision = convertedRevision.replaceAll("'", "\\'")
        console.log(`id: ${revision.id} \n sanitized: ${sanitizedRevision}`)
        await db.runSql(`
          UPDATE entity_revision_field
          SET value = '${sanitizedRevision}'
          WHERE id = ${revision.id}
        `)
      }
    }
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

    return !converted || typeof converted === 'string'
        ? converted
        : JSON.stringify(converted)
  }

  // fallback
  return input
}
