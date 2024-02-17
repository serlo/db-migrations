import * as t from 'io-ts'

import { createEdtrIoMigration, transformPlugins } from './utils'

const InjectionPlugin = t.type({
  plugin: t.literal('injection'),
  state: t.string,
})

createEdtrIoMigration({
  exports,
  log: () => void 0,
  migrationName: 'update-uuid-links-in-injections',
  migrateState: transformPlugins({
    injection: (plugin) => {
      if (!InjectionPlugin.is(plugin)) {
        return undefined
      }

      const injectionUrl = plugin.state.trim()
      const injectionUuid = getUuidFromPathname(injectionUrl)

      if (injectionUuid) {
        return [{ plugin: 'injection', state: `/${injectionUuid}` }]
      }

      return [plugin]
    },
  }),
})

function getUuidFromPathname(pathname: string): null | number {
  const prefixes = ['\\', 'ref/', '/\\', '//', 'http://de.serlo.org/', '/ref/']

  for (const prefix of prefixes) {
    if (pathname.startsWith(prefix)) {
      pathname = pathname.slice(prefix.length)
    }
  }

  if (/^\d+$/.exec(pathname)) {
    return parseInt(pathname)
  }

  const match = /^https:\/\/hi\.serlo\.org\/(\d+)\/.*$/.exec(pathname)

  if (match) {
    return parseInt(match[1])
  }

  return null
}
