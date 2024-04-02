import { OpenAI } from 'openai'

import { Database, SlackLogger } from './utils'

export async function up(db: Database) {
  if (
    process.env.CI === 'true' ||
    process.env.OPENAI_API_KEY === 'sk-whatever'
  ) {
    console.log(
      'It is running in a CI environment or you are operating with invalid openai key. Skipping...',
    )
    return
  }
  const openAIClient = getAIClient()
  const slackLogger = new SlackLogger('add-description-for-content-without-one')
  await createDescriptions(db, openAIClient, slackLogger)
  await slackLogger.closeAndSend()
}

async function createDescriptions(
  db: Database,
  openAIClient: OpenAI,
  slackLogger: SlackLogger,
) {
  const revisionsWithoutDescription: {
    revisionId: number
    content: string
    descriptionId: number | null
  }[] = await db.runSql(`
      SELECT
        erf.entity_revision_id as revisionId,
        erf.value as content,
        description_field.id as descriptionId
      FROM entity_revision_field erf
      LEFT JOIN entity_revision_field description_field
        ON erf.entity_revision_id = description_field.entity_revision_id
        AND description_field.field = "meta_description"
      WHERE erf.field = "content"
      AND erf.entity_revision_id IN
      (
        SELECT current_revision_id FROM entity
        JOIN uuid ON uuid.id = entity.id
        JOIN type ON type.id = type_id
        WHERE trashed = 0
        AND type.name IN ("applet", "article", "course", "text-exercise", "text-exercise-group")
        AND instance_id = 1
      )
      AND (description_field.value is null or description_field.value = "")
      LIMIT 100
    `)

  const revisionsWithGeneratedDescription = await getRevisionsWithDescription(
    revisionsWithoutDescription,
    openAIClient,
    slackLogger,
  )

  for (const revision of revisionsWithGeneratedDescription) {
    if (revision.descriptionId != null) {
      await db.runSql(
        `
          UPDATE entity_revision_field
          SET value = ?, is_meta_description_ai_generated = 'true'
          WHERE entity_revision_field.id = ?
        `,
        [revision.description, revision.descriptionId],
      )
    } else {
      await db.runSql(
        `
          INSERT INTO entity_revision_field (field, entity_revision_id, value, is_meta_description_ai_generated)
          VALUES ('meta_description', ?, ?, 'true')
        `,
        [revision.revisionId, revision.description],
      )
    }
  }
}

async function getRevisionsWithDescription(
  revisionsWithJSONContent: {
    revisionId: number
    content: string
    descriptionId: number | null
  }[],
  openAIClient: OpenAI,
  slackLogger: SlackLogger,
): Promise<
  { revisionId: number; description: string; descriptionId: number | null }[]
> {
  let revisions = []

  for (const revision of revisionsWithJSONContent) {
    const plainTextContent = convertToPlainText(revision.content)

    if (plainTextContent.length < 20) {
      slackLogger.logEvent('noDescriptionCreated', {
        reason: 'Content too short',
        revisionId: revision.revisionId,
      })
      continue
    }

    const description = await generateDescription(
      plainTextContent,
      openAIClient,
    )

    if (!description) {
      slackLogger.logEvent('noDescriptionCreated', {
        reason: 'AI could not generate description',
        revisionId: revision.revisionId,
      })
      continue
    }

    slackLogger.logEvent(`createDescription`, {
      revisionId: revision.revisionId,
      plainTextContent,
      newDescription: description,
    })

    revisions.push({
      ...revision,
      description,
    })
  }

  return revisions
}

async function generateDescription(
  plainTextContent: string,
  openAIClient: OpenAI,
): Promise<string | null> {
  const messages = [
    {
      // Regarding `as const` see https://github.com/openai/openai-node/issues/639
      role: 'system' as const,
      content: `Given the following German-language content, generate an SEO-optimized meta description. The description should be concise, accurately summarize the key points and topics covered, and include relevant keywords to enhance searchability. Aim for a length of around 100 characters to ensure it fits within search engine snippet limits. Please use the informal 'Du' form to align with the audience of school students: ${plainTextContent}`,
    },
  ]

  const response = await openAIClient.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 100,
  })

  const responseContent = response.choices[0].message.content

  return responseContent
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

function getTextSnippets(object: any): string[] {
  if (typeof object !== 'object' || object === null) {
    return []
  }

  if (Array.isArray(object)) {
    return object.flatMap(getTextSnippets)
  }

  return Object.entries(object).flatMap(([key, value]) =>
    key === 'text' ? [String(value)] : getTextSnippets(value),
  )
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
