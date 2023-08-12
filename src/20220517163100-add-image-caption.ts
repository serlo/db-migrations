import * as R from 'ramda'

import { createEdtrIoMigration, replacePluginState } from './utils'

export const addImageCaption = replacePluginState({
  image: ({ state }) => {
    if (typeof state !== 'object' || state === null)
      throw new Error('Illegal image state')

    return R.has('caption', state)
      ? state
      : {
          ...state,
          caption: { plugin: 'text', state: [{ type: 'p', children: [{}] }] },
        }
  },
})

createEdtrIoMigration({
  exports: module.exports,
  migrateState: addImageCaption,
})
