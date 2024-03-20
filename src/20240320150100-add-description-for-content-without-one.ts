import { createMigration, migrateSerloEditorContent } from './utils'

function getTextFromObject(object: any): string[] {
  if (typeof object !== 'object' || object === null) {
    return []
  }

  if (Array.isArray(object)) {
    return object.flatMap(getTextFromObject)
  }

  return Object.entries(object).flatMap(([key, value]) =>
    key === 'text' ? [value] : getTextFromObject(value),
  ) as string[]
}

createMigration(exports, {
  up: async (db) => {
    const entitiesWithEmptyDescription: {
      revisionId: number
      content: string
    }[] = await db.runSql(`
      SELECT entity_revision_id as revisionId, value as content FROM entity_revision_field
      WHERE field = "content"
      AND entity_revision_id IN
      (
        SELECT current_revision_id FROM entity 
          JOIN entity_revision_field ON entity_revision_field.entity_revision_id = current_revision_id 
          JOIN uuid ON uuid.id = entity.id 
          JOIN type ON type.id = type_id
          WHERE trashed = 0 
          AND type.name IN ("applet", "article", "course", "text-exercise", "text-exercise-group", "video")
          AND field = 'meta_description'
          AND instance_id = 1
          AND value = ''
      )
      LIMIT 3
      `)
    const bla = entitiesWithEmptyDescription.map((entity) => {
      return {
        ...entity,
        content: getTextFromObject(JSON.parse(entity.content))
          .map((str) => str.trim())
          .filter((str) => str.length > 0)
          .join(' ')
          .replace(/ , /g, ', ')
          .replace(/ \. /g, '. ')
          .replace(/  +/g, ' '),
      }
    })
    // let ChatGPT create description from content
    // write description to database
    console.log(bla)
  },
})
