import Redis from 'ioredis'

import { ApiCache } from '../src/utils/api-cache'

const redis = new Redis(process.env.REDIS_URL as string)
const apiCache = new ApiCache()

afterAll(async () => {
  await redis.quit()
  await apiCache.deleteKeysAndQuit()
})

describe('deleteUuid', () => {
  test('deletes uuid key', async () => {
    await redis.set('de.serlo.org/api/uuid/1', 'hello')

    await apiCache.markUuid(1)

    expect(await redis.get('de.serlo.org/api/uuid/1')).toBeNull()
  })

  test('does not throw an error when key is not present', async () => {
    await apiCache.markUuid(42)

    expect(await redis.get('de.serlo.org/api/uuid/42')).toBeNull()
  })
})
