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
          SELECT erf.id, erf.value as content, erf.entity_revision_id as revisionId
          FROM entity_revision_field erf
          WHERE erf.field = 'content' and erf.id > ?
        `,
        migrateState,
        async updateRevision(newContent, revision) {
          await db.runSql(
            `UPDATE entity_revision_field SET value = ? WHERE id = ?`,
            newContent,
            revision.id,
          )
        },
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
        async updateRevision(newContent, revision) {
          await db.runSql(
            `UPDATE page_revision SET content = ? WHERE id = ?`,
            newContent,
            revision.id,
          )
        },
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
        async updateRevision(newContent, revision) {
          await db.runSql(
            `UPDATE term_taxonomy SET content = ? WHERE id = ?`,
            newContent,
            revision.id,
          )
        },
        apiCache,
        dryRun,
        db,
      })

      await changeAllRevisions({
        query: `
          SELECT id, description as content, id as revisionId
          FROM user WHERE description != "NULL" and id > ?
        `,
        migrateState,
        async updateRevision(newContent, revision) {
          await db.runSql(
            `UPDATE user SET description = ? WHERE id = ?`,
            newContent,
            revision.id,
          )
        },
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
  updateRevision,
  migrateState,
  apiCache,
  dryRun,
}: {
  query: string
  db: Database
  updateRevision: (newContent: string, revision: Revision) => Promise<void>
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
      }

      if (!isPlugin(oldState)) {
        // state of legacy markdown editor
        continue
      }

      const newState = JSON.stringify(migrateState(oldState))

      if (newState !== revision.content) {
        if (dryRun) {
          console.log('Revision: ', revision.revisionId, ' done.')
        } else {
          await updateRevision(newState, revision)
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
