import { ApiCache } from './api-cache'
import { CallbackBasedDatabase, createDatabase, Database } from './database'
import { isPlugin } from './edtr-io'
import type { WriteStream } from 'fs'
import { createWriteStream } from 'fs'
import path from 'path'
import { tmpdir } from 'os'

export function createMigration(
  exports: any,
  {
    up,
    down,
  }: {
    up: (db: Database) => Promise<void>
    down?: (db: Database) => Promise<void>
  },
) {
  exports._meta = {
    version: 1,
  }
  exports.up = (db: CallbackBasedDatabase, cb: Callback) => {
    up(createDatabase(db))
      .then(() => {
        cb(undefined)
      })
      .catch((error) => {
        cb(error)
      })
  }
  exports.down = (db: CallbackBasedDatabase, cb: Callback) => {
    if (typeof down === 'function') {
      down(createDatabase(db))
        .then(() => {
          cb()
        })
        .catch((error) => {
          cb(error)
        })
    } else {
      cb()
    }
  }
}

export function createEdtrIoMigration({
  exports,
  ...otherArgs
}: {
  exports: any
  migrateState: (state: any) => any
  dryRun?: boolean
  migrationName?: string
  log?: (message: string) => void
}) {
  createMigration(exports, {
    up: async (db) => {
      const apiCache = new ApiCache()

      await migrateSerloEditorContent({ ...otherArgs, apiCache, db })

      await apiCache.quit()
    },
  })
}

export async function migrateSerloEditorContent({
  migrateState,
  dryRun,
  apiCache,
  db,
  migrationName = 'migration',
  log = console.log,
}: {
  migrateState: (state: any) => any
  dryRun?: boolean
  migrationName?: string
  apiCache: ApiCache
  db: Database
  log?: (message: string) => void
}) {
  const logFileName = path.join(tmpdir(), `${migrationName}.log.json`)
  const logFileStream = createWriteStream(logFileName)

  log('Convert entity revisions')
  await changeUuidContents({
    query: `
          SELECT
            entity_revision_field.id as id,
            entity_revision_field.entity_revision_id as uuid,
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
    migrateState,
    table: 'entity_revision_field',
    column: 'value',
    apiCache,
    dryRun,
    db,
    log,
    logFileStream,
  })

  log('Convert page revisions')
  await changeUuidContents({
    query: `
          SELECT
            page_revision.id, page_revision.content, page_revision.id as uuid
          FROM page_revision WHERE page_revision.id > ?
        `,
    migrateState,
    table: 'page_revision',
    column: 'content',
    apiCache,
    dryRun,
    db,
    log,
    logFileStream,
  })

  log('Convert taxonomy terms')
  await changeUuidContents({
    query: `
          SELECT id, description as content, id as uuid
          FROM term_taxonomy WHERE id > ?
        `,
    migrateState,
    table: 'term_taxonomy',
    column: 'description',
    apiCache,
    dryRun,
    db,
    log,
    logFileStream,
  })

  log('Convert users')
  await changeUuidContents({
    query: `
          SELECT id, description as content, id as uuid
          FROM user WHERE id != 191656 and description != "NULL" and id > ?
        `,
    migrateState,
    table: 'user',
    column: 'description',
    apiCache,
    dryRun,
    db,
    log,
    logFileStream,
  })
}

async function changeUuidContents({
  query,
  db,
  migrateState,
  apiCache,
  dryRun,
  table,
  column,
  logFileStream,
  log,
}: {
  query: string
  db: Database
  table: string
  column: string
  migrateState: (state: any) => any
  apiCache: ApiCache
  logFileStream: WriteStream
  dryRun?: boolean
  log: (message: string) => void
}) {
  const querySQL = query + ' LIMIT ?'
  let uuids: Uuid[] = []

  do {
    const lastID = uuids.at(-1)?.id ?? 0
    log(`Last ID: ${lastID}`)
    uuids = await db.runSql(querySQL, lastID, 5000)

    for (const uuid of uuids) {
      let oldState

      try {
        oldState = JSON.parse(uuid.content)
      } catch (e) {
        // Ignore (some articles have raw text)
        continue
      }

      if (!isPlugin(oldState)) {
        // state of legacy markdown editor
        continue
      }

      const newContent = JSON.stringify(migrateState(oldState))

      if (newContent !== JSON.stringify(oldState)) {
        if (!dryRun) {
          await db.runSql(
            `UPDATE ${table} SET ${column} = ? WHERE id = ?`,
            newContent,
            uuid.id,
          )
          await apiCache.deleteUuid(uuid.uuid)
        }

        log(`Update ${table}.${column} with ID ${uuid.uuid}`)

        logFileStream.write(
          JSON.stringify({
            table,
            column,
            uuid: uuid.uuid,
            tableId: uuid.id,
            oldContent: uuid.content,
            newContent,
          }),
        )
        logFileStream.write('\n')
      }
    }
  } while (uuids.length > 0)
}

interface Uuid {
  id: number
  content: string
  uuid: number
}

type Callback = (error?: Error) => void
