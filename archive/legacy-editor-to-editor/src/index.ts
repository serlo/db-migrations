import split from './legacyToSplish/split'
import transform from './legacyToSplish/transform'
import {
  Legacy,
  Splish,
  RowsPlugin,
  isSplish,
  convertRow,
} from './splishToEdtr'

export function convert(content: Legacy | Splish): RowsPlugin {
  if (!content) return { plugin: 'rows', state: [] }
  const splish = isSplish(content)
    ? content
    : convertLegacyToSplish(content, '')
  return convertSplishToEdtrIO(splish)
}

export function convertLegacyToSplish(content: Legacy, id: string): Splish {
  const cells = split(transform(content))
  return {
    ...cells,
    id,
  }
}

export function convertSplishToEdtrIO(content: Splish): RowsPlugin {
  return {
    plugin: 'rows',
    state: convertRow(content),
  }
}

export { isSplish, isEdtr } from './splishToEdtr'
export type {
  OtherPlugin,
  LayoutPlugin,
  Legacy,
  Splish,
  RowsPlugin,
  Edtr,
} from './splishToEdtr'
