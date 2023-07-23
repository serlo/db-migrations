import { convert, Edtr, Legacy } from '@serlo/legacy-editor-to-editor'

// Follow ups:
// run table to serloTable conversion again
// run important and blockquote conversions again
// auto-convert layout plugin to either multimedia or rows plugin
// maybe run add-image-caption mutation again
// maybe run migrate-equations, add-first-explanation-to-equation and add-transformation-target-to-equations again

function convertOrReturnInput(input?: string) {
  if (!input) {
    return input
    // should we return undefined / '' or something like this?
    // { plugin: 'rows', state: [{ plugin: 'text' }] }
  }

  // probably editor state already
  if (input?.startsWith('{')) return input

  if (input?.startsWith('[')) {
    // Legacy editor state

    const legacy = input as Legacy
    // fixes https://github.com/serlo/frontend/issues/1563
    const sanitized = JSON.parse(JSON.stringify(legacy).replace(/```/g, ''))
    const converted = convert(sanitized) as Edtr

    const serialized =
      !converted || typeof converted === 'string'
        ? converted
        : JSON.stringify(converted)

    return serialized
  }

  // fallback
  return input
}
