import * as R from 'ramda'

export function replacePlugins(transformations: {
  [key in string]?: (args: {
    plugin: Plugin
    applyChangeToChildren: Transformation
  }) => Plugin
}): Transformation {
  return updatePlugins((plugin, applyChangeToChildren) => {
    const transformFunc = transformations[plugin.plugin]

    if (typeof transformFunc === 'function') {
      return transformFunc({ plugin, applyChangeToChildren })
    }
  })
}

export function replacePluginState(transformations: {
  [key in string]?: (args: {
    state: unknown
    applyChangeToChildren: Transformation
  }) => unknown
}): Transformation {
  return updatePlugins(({ plugin, state }, applyChangeToChildren) => {
    const transformFunc = transformations[plugin]

    if (typeof transformFunc === 'function') {
      return { plugin, state: transformFunc({ state, applyChangeToChildren }) }
    }
  })
}

function updatePlugins(
  updatePlugin: (
    plugin: Plugin,
    applyChangeToChildren: Transformation,
  ) => Plugin | undefined,
): Transformation {
  function applyChangeToChildren(value: unknown): unknown {
    if (isPlugin(value)) {
      const newPlugin = updatePlugin(value, applyChangeToChildren)

      if (newPlugin) return newPlugin
    }

    if (Array.isArray(value)) {
      return value.map(applyChangeToChildren)
    }

    if (typeof value === 'object' && value !== null) {
      return R.mapObjIndexed(applyChangeToChildren, value)
    }

    return value
  }

  return applyChangeToChildren
}

export function isPlugin(value: unknown): value is Plugin {
  return (
    R.has('plugin', value) &&
    R.has('state', value) &&
    typeof value.plugin === 'string'
  )
}

export type Transformation = (value: unknown) => unknown

export interface Plugin {
  plugin: string
  state: unknown
}
