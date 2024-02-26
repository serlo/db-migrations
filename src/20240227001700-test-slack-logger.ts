import { createMigration, SlackLogger } from './utils'

createMigration(exports, {
  up: async () => {
    const logger = new SlackLogger('test-slack-logger')

    logger.logEvent('helloWorld', { message: 'Hello Slack People!' })

    await logger.closeAndSend()
  },
})
