import {
  ApiCache,
  createMigration,
  deleteUnsupportedEntityTypes,
} from './utils'

const unsupportedEntityTypes = [
  'input-expression-equal-match-challenge',
  'input-number-exact-match-challenge',
  'input-string-normalized-match-challenge',
  'math-puzzle',
  'multiple-choice-right-answer',
  'multiple-choice-wrong-answer',
  'single-choice-right-answer',
  'single-choice-wrong-answer',
]

createMigration(exports, {
  up: async (db) => {
    const apiCache = new ApiCache()

    await deleteUnsupportedEntityTypes({ db, apiCache, unsupportedEntityTypes })

    await apiCache.quit()
  },
})
