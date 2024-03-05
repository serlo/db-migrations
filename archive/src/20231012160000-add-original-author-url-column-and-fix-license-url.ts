import { createMigration } from './utils'

createMigration(module.exports, {
  up: async (db) => {
    await db.runSql(
      'ALTER TABLE license ADD original_author_url VARCHAR(255) DEFAULT NULL;',
    )

    const rowsToAddLicenseUrl = [
      [4, 'https://creativecommons.org/licenses/by-sa/4.0/deed.de'],
      [6, 'https://creativecommons.org/licenses/by-sa/4.0/deed.de'],
      [7, 'https://creativecommons.org/licenses/by-sa/4.0/deed.de'],
      [19, 'https://creativecommons.org/licenses/by/4.0/deed.de'],
      [22, 'https://creativecommons.org/licenses/by-sa/4.0/deed.es'],
      [23, 'https://creativecommons.org/licenses/by-sa/4.0/deed.es'],
      [24, 'https://creativecommons.org/licenses/by-sa/4.0/deed.de'],
    ]

    for (const rowToAddLicenseUrl of rowsToAddLicenseUrl) {
      await db.runSql(
        `UPDATE license SET original_author_url = url, url = '${rowToAddLicenseUrl[1]}' WHERE id = ${rowToAddLicenseUrl[0]};`,
      )
    }

    const rowsToAdjustLicenseUrl = [
      // Add ShareAlike
      [9, 'https://creativecommons.org/licenses/by-sa/4.0/'],
      [13, 'https://creativecommons.org/licenses/by-sa/4.0/'],
      [17, 'https://creativecommons.org/licenses/by-sa/4.0/'],
      // Change deed language
      [16, 'https://creativecommons.org/licenses/by-nd/4.0/deed.de'],
      // Add ShareAlike and change deed language
      [18, 'http://creativecommons.org/licenses/by-sa/4.0/deed.fr'],
    ]

    for (const rowToAdjustLicenseUrl of rowsToAdjustLicenseUrl) {
      await db.runSql(
        `UPDATE license SET url = '${rowToAdjustLicenseUrl[1]}' WHERE id = ${rowToAdjustLicenseUrl[0]};`,
      )
    }
  },
})
