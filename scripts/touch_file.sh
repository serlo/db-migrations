echo "Enter the name of the migration (no spaces and with hifens)"

read FILENAME

DATE=$(date +%Y%m%d%H%M00)
FILENAME="src/${DATE}-${FILENAME}.ts"

echo "import { ApiCache, Database, SlackLogger } from './utils'

export async function up(db: Database) {
  const apiCache = new ApiCache()
  const logger = new SlackLogger('${FILENAME}')

  await logger.closeAndSend()
  // To reduce the time between deleting the keys and finishing the DB
  // transaction, this should be the last command
  await apiCache.deleteKeysAndQuit()
}"> "$FILENAME"
