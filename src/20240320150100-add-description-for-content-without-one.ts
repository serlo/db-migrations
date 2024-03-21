import { createMigration, Database } from './utils'
import { OpenAI } from 'openai'

function getTextSnippets(object: any): string[] {
  if (typeof object !== 'object' || object === null) {
    return []
  }

  if (Array.isArray(object)) {
    return object.flatMap(getTextSnippets)
  }

  return Object.entries(object).flatMap(([key, value]) =>
    key === 'text' ? [String(value)] : getTextSnippets(value),
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

async function generateDescription(
  plainTextContent: string,
  openAIClient: OpenAI,
): Promise<string> {
  if (plainTextContent.length < 20) return ''

  const messages = [
    {
      // Regarding `as const` see https://github.com/openai/openai-node/issues/639
      role: 'system' as const,
      content: `Antworte mit einer 60 bis 160 Zeichen langen Inhaltsbeschreibung des folgenden Textes: ${plainTextContent}`,
    },
  ]

  const response = await openAIClient.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 100,
  })

  const responseContent = response.choices[0].message.content

  if (!responseContent) {
    // TODO: Do not throw error, handle it in other way
    throw new Error('No content received from LLM!')
  }

  // TODO: log the generated content to slack document, put also revision_id

  return responseContent
}

async function createDescriptionWhereEmpty(db: Database, openAIClient: OpenAI) {
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
          AND type.name IN ("applet", "article", "course", "text-exercise", "text-exercise-group")
          AND field = 'meta_description'
          AND instance_id = 1
          AND value = ''
      )
      `)

  const revisionsWithGeneratedDescriptions = await Promise.all(
    entitiesWithEmptyDescription.map(async (entity) => {
      return {
        revisionId: entity.revisionId,
        description: await generateDescription(
          convertToPlainText(entity.content),
          openAIClient,
        ),
      }
    }),
  )

  for (const revision of revisionsWithGeneratedDescriptions) {
    if (revision.description !== '') {
      await db.runSql(
        `
        UPDATE entity_revision_field
        SET value = ?
        WHERE entity_revision_id = ?
          AND field = 'meta_description'
      `,
        [revision.description, revision.revisionId],
      )
    }
  }
}
async function createDescriptionWhereMissing(
  db: Database,
  openAIClient: OpenAI,
) {
  const entitiesWithoutDescription: {
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
        AND type.name IN ("applet", "article", "course", "text-exercise", "text-exercise-group")
        AND instance_id = 1
        AND entity.id NOT IN (
          SELECT distinct(entity.id) FROM entity_revision_field
          JOIN entity_revision ON entity_revision_id = entity_revision.id
          JOIN entity ON entity.id = entity_revision.repository_id 
          WHERE field LIKE "meta_description"
        )
      )
      `)

  const revisionsWithGeneratedDescriptions = await Promise.all(
    entitiesWithoutDescription.map(async (entity) => {
      return {
        revisionId: entity.revisionId,
        description: await generateDescription(
          convertToPlainText(entity.content),
          openAIClient,
        ),
      }
    }),
  )

  for (const revision of revisionsWithGeneratedDescriptions) {
    if (revision.description !== '') {
      await db.runSql(
        `
        INSERT INTO entity_revision_field (field, entity_revision_id, value)
        VALUES ('meta_description', ?, ?)
      `,
        [revision.revisionId, revision.description],
      )
    }
  }
}

createMigration(exports, {
  up: async function (db) {
    const openAIClient = getAIClient()
    await createDescriptionWhereEmpty(db, openAIClient)
    await createDescriptionWhereMissing(db, openAIClient)
  },
})
