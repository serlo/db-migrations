import { ApiCache, SlackLogger, Database } from './utils'

export async function up(db: Database) {
  const logger = new SlackLogger('fix-broken-subscriptions')

  const brokenSubscriptions = await db.runSql<
    {
      id: number
      userId: number
      commentId: number
    }[]
  >(`
        SELECT subscription.id,
            user_id AS userId,
            uuid_id AS commentId
        FROM subscription join uuid ON uuid.id = uuid_id 
        WHERE discriminator = 'comment' 
            AND uuid_id NOT IN (SELECT id FROM comment)
    `)
  const apiCache = new ApiCache()

  for (const subscription of brokenSubscriptions) {
    await db.runSql(
      `
            DELETE FROM subscription WHERE id = ?
        `,
      subscription.id,
    )

    await db.runSql(
      `
            DELETE FROM uuid WHERE id = ?
        `,
      subscription.commentId,
    )

    apiCache.markSubscription(subscription.userId)

    logger.logEvent(`subscription ${subscription.id} deleted`, {
      user: subscription.userId,
      commentId: subscription.commentId,
    })
  }
  await apiCache.deleteKeysAndQuit()
  await logger.closeAndSend()
}
