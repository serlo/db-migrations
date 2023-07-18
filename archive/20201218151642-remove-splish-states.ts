/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { convertSplishToEdtrIO } from './legacy-editor-to-editor'

import { createMigration } from '../src/utils'

function migrateSplishToEdtrIo(serializedState: string): string {
  const state = JSON.parse(serializedState)
  return JSON.stringify(convertSplishToEdtrIO(state))
}

/**
 * Migrates the remaining Splish Editor states to Edtr.io states
 * THIS IS AN IRREVERSIBLE MIGRATION!
 */
createMigration(exports, {
  up: async (db) => {
    async function processEntities() {
      interface Row {
        id: number
        value: string
      }
      async function processResults(results: Row[]) {
        if (results.length === 0) return

        const [field, ...remainingResults] = results
        let convertedState
        try {
          convertedState = migrateSplishToEdtrIo(field.value)
        } catch (err) {
          await processResults(remainingResults)
          return
        }
        await db.runSql(
          `UPDATE entity_revision_field SET value = ? WHERE id = ?`,
          convertedState,
          field.id,
        )
        await processResults(remainingResults)
      }

      const results = await db.runSql<Row[]>(`
        SELECT erf.id, erf.value
        FROM entity_revision_field erf
          LEFT JOIN entity_revision er ON erf.entity_revision_id = er.id
        WHERE erf.value LIKE '{"id":%@splish-me%'
      `)
      await processResults(results)
    }

    async function processPages() {
      interface Row {
        id: number
        content: string
      }
      async function processResults(results: Row[]) {
        if (results.length === 0) return

        const [field, ...remainingResults] = results
        let convertedState
        try {
          convertedState = migrateSplishToEdtrIo(field.content)
        } catch (err) {
          await processResults(remainingResults)
          return
        }
        await db.runSql(
          `UPDATE page_revision SET content = ? WHERE id = ?`,
          convertedState,
          field.id,
        )
        await processResults(remainingResults)
      }

      const results = await db.runSql<Row[]>(`
        SELECT id, content FROM page_revision WHERE content LIKE '{"id":%@splish-me%'
      `)
      await processResults(results)
    }

    async function processTaxonomyTerms() {
      interface Row {
        id: number
        description: string
      }
      async function processResults(results: Row[]) {
        if (results.length === 0) return

        const [field, ...remainingResults] = results
        let convertedState
        try {
          convertedState = migrateSplishToEdtrIo(field.description)
        } catch (err) {
          await processResults(remainingResults)
          return
        }
        await db.runSql(
          `UPDATE term_taxonomy SET description = ? WHERE id = ?`,
          convertedState,
          field.id,
        )
        await processResults(remainingResults)
      }

      const results = await db.runSql<Row[]>(`
        SELECT id, description FROM term_taxonomy WHERE description LIKE '{"id":%@splish-me%'
      `)
      await processResults(results)
    }

    async function processUsers() {
      interface Row {
        id: number
        description: string
      }
      async function processResults(results: Row[]) {
        if (results.length === 0) return

        const [field, ...remainingResults] = results
        let convertedState
        try {
          convertedState = migrateSplishToEdtrIo(field.description)
        } catch (err) {
          await processResults(remainingResults)
          return
        }
        await db.runSql(
          `UPDATE user SET description = ? WHERE id = ?`,
          convertedState,
          field.id,
        )
        await processResults(remainingResults)
      }

      const results = await db.runSql<Row[]>(`
        SELECT id, description FROM user WHERE description LIKE '{"id":%@splish-me%'
      `)
      await processResults(results)
    }

    await processEntities()
    await processPages()
    await processTaxonomyTerms()
    await processUsers()
  },
})
