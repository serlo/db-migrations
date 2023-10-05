import { createMigration } from './utils'
import { format, subYears } from 'date-fns'

createMigration(exports, {
  up: async (db) => {
    const dateOneYearAgo = format(
      subYears(new Date(), 1),
      'yyyy-MM-dd HH:mm:ss',
    )
    const uuidsToDelete: { uuid_id: number }[] = await db.runSql(`
      SELECT uuid_id
      FROM event_log, uuid, entity
      WHERE uuid.id = event_log.uuid_id
      AND event_log.date < "${dateOneYearAgo}"
      AND entity.id = event_log.uuid_id
      AND event_log.event_id = 10
      AND uuid.trashed = 1
      AND uuid.discriminator = \'entity\'
      AND entity.type_id NOT IN (35, 39, 40, 41, 42, 43, 44)
      `)
    if (uuidsToDelete.length > 0) {
      const uuidsToDeleteSeparatedByComma = uuidsToDelete
        .map((item) => item.uuid_id)
        .join(', ')
      await db.runSql(`
        DELETE FROM uuid 
        WHERE id IN (${uuidsToDeleteSeparatedByComma})
        `)
    }
  },
})
