import { ApiCache } from './api-cache'
import { CallbackBasedDatabase, createDatabase, Database } from './database'
import { isPlugin } from './edtr-io'

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
  migrateState,
  dryRun,
}: {
  exports: any
  migrateState: (state: any) => any
  dryRun?: boolean
}) {
  createMigration(exports, {
    up: async (db) => {
      const apiCache = new ApiCache()

      await changeAllRevisions({
        query: `
          SELECT
              entity_revision_field.id as id,
              entity_revision_field.entity_revision_id as revision_id,
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
        updateQuery: `UPDATE entity_revision_field SET value = ? WHERE id = ?`,
        apiCache,
        dryRun,
        db,
      })

      await changeAllRevisions({
        query: `
          SELECT
            page_revision.id, page_revision.content, page_revision.id as revisionId
          FROM page_revision WHERE page_revision.id > ?
        `,
        migrateState,
        updateQuery: `UPDATE page_revision SET content = ? WHERE id = ?`,
        apiCache,
        dryRun,
        db,
      })

      await changeAllRevisions({
        query: `
          SELECT id, description as content, id as revisionId
          FROM term_taxonomy WHERE id > ?
        `,
        migrateState,
        updateQuery: `UPDATE term_taxonomy SET content = ? WHERE id = ?`,
        apiCache,
        dryRun,
        db,
      })

      await changeAllRevisions({
        query: `
          SELECT id, description as content, id as revisionId
          FROM user WHERE id != 191656 and description != "NULL" and id > ?
        `,
        migrateState,
        updateQuery: `UPDATE user SET description = ? WHERE id = ?`,
        apiCache,
        dryRun,
        db,
      })

      await apiCache.quit()
    },
  })
}

async function changeAllRevisions({
  query,
  db,
  updateQuery,
  migrateState,
  apiCache,
  dryRun,
}: {
  query: string
  db: Database
  updateQuery: string
  migrateState: (state: any) => any
  apiCache: ApiCache
  dryRun?: boolean
}) {
  const querySQL = query + ' LIMIT ?'
  let revisions: Revision[] = []

  do {
    const lastRevisionId = revisions.at(-1)?.revisionId ?? 0
    revisions = await db.runSql(querySQL, lastRevisionId, 5000)

    for (const revision of revisions) {
      let oldState

      try {
        oldState = JSON.parse(revision.content)
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
        if (dryRun) {
          console.log('Revision: ', revision.revisionId, ' done.')
        } else {
          await db.runSql(updateQuery, newContent, revision.id)
          await apiCache.deleteUuid(revision.revisionId)
          console.log('Updated revision', revision.revisionId)
        }
      }
    }
  } while (revisions.length > 0)
}

interface Revision {
  id: number
  content: string
  revisionId: number
}

type Callback = (error?: Error) => void
