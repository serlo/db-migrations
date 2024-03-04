import * as R from 'ramda'

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
