import { createMigration } from './utils'
import { OpenAI } from 'openai'

function getTextSnippets(object: any): string[] {
  if (typeof object !== 'object' || object === null) {
    return []
  }

  if (Array.isArray(object)) {
    return object.flatMap(getTextSnippets)
  }

  return Object.entries(object).flatMap(([key, value]) =>
    key === 'text' ? [value] : getTextSnippets(value),
  ) as string[]
}

function convertToPlainText(contentJSON: string): string {
  return getTextSnippets(JSON.parse(contentJSON))
    .map((str) => str.trim())
    .filter((str) => str.length > 0)
    .join(' ')
    .replace(/ , /g, ', ')
    .replace(/ \. /g, '. ')
    .replace(/  +/g, ' ')
}

function getAIClient() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY || OPENAI_API_KEY === '') {
    throw new Error('Env `OPENAI_API_KEY` is not defined')
  }
  return new OpenAI({
    apiKey: OPENAI_API_KEY,
  })
}

function generateDescription(plainTextContent: string): string {
  // todo: prompt LLM to generate a description from content given as plain text
  return 'test'
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
    const revisionsWithGeneratedDescriptions = entitiesWithEmptyDescription.map(
      (entity) => {
        return {
          revisionId: entity.revisionId,
          description: generateDescription(convertToPlainText(entity.content)),
        }
      },
    )
    // todo: write description to database
    console.log(revisionsWithGeneratedDescriptions)
    // todo: handle the entities without description field
  },
})
