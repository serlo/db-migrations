import { v4 as uuidv4 } from 'uuid'
import {
  ApiCache,
  Database,
  SlackLogger,
  migrateSerloEditorContent,
  transformAllPlugins,
} from './utils'

export async function up(db: Database) {
  const apiCache = new ApiCache()
  const logger = new SlackLogger('20240419175700-add-uuid-to-editor-documents')

  await migrateSerloEditorContent({
    apiCache,
    db,
    migrationName: 'add-uuid-to-editor-documents',
    // Only plugins (documents) that do not have one,
    // need to receive a UUID
    migrateState: transformAllPlugins((plugin) => {
      if (!plugin.id) {
        return [
          {
            ...plugin,
            id: uuidv4(),
          },
        ]
      }

      return [plugin]
    }),
  })

  await logger.closeAndSend()

  await apiCache.deleteKeysAndQuit()
}