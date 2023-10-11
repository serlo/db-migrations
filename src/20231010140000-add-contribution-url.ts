import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await db.runSql('ALTER TABLE license ADD contribution_url VARCHAR(255) DEFAULT NULL;')

    // TODO: https://github.com/serlo/backlog/issues/266#issuecomment-1757583783
    const rowsToChange = [
      [4, "https://creativecommons.org/licenses/by-sa/4.0/deed.de"],
      [6, "https://creativecommons.org/licenses/by-sa/4.0/deed.de"],
      [7, "https://creativecommons.org/licenses/by-sa/4.0/deed.de"],
      [19, "https://creativecommons.org/licenses/by/4.0/deed.de"],
      [22, "https://creativecommons.org/licenses/by-sa/4.0/deed.es"],
      [23, "https://creativecommons.org/licenses/by-sa/4.0/deed.es"],
      [24, "https://creativecommons.org/licenses/by-sa/4.0/deed.de"]
    ]

    for (const row of rowsToChange) {
      await db.runSql(`UPDATE license SET contribution_url = url, url = ${row[1]} WHERE id = ${row[0]};`)
    }
  },
})
