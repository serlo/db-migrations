import { createMigration, migrateSerloEditorContent } from './utils'

function getTextFromObject(object: any): string[] {
    const strings: string[] = [];

    if (typeof object === 'object' && object !== null) {
        if (Array.isArray(object)) {
            for (const item of object) {
                strings.push(...getTextFromObject(item));
            }
        } else {
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    if (key === 'text') {
                        strings.push(object[key]);
                    } else {
                        strings.push(...getTextFromObject(object[key]));
                    }
                }
            }
        }
    }

    return strings;
}

createMigration(exports, {
  up: async (db) => {
    const entitiesWithEmptyDescription: { revisionId: number, content: string }[] = await db.runSql(`
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
    for (const entity of entitiesWithEmptyDescription) {
      entity.content = getTextFromObject(JSON.parse(entity.content)).join(" ")
    }
    // let ChatGPT create description from content
    // write description to database
    console.log(entitiesWithEmptyDescription)
  },
})
