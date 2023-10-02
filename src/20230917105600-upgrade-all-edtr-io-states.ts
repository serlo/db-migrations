import { function as f } from 'fp-ts'
import * as t from 'io-ts'
import {
  createEdtrIoMigration,
  replacePluginState,
  transformPlugins,
} from './utils'

import { addImageCaption } from './20220517163100-add-image-caption'
import { addFirstExplanationToEquation } from './20210923155000-add-first-explanation-to-equation'
import { addTransformationTargetToEquation } from './20210923231900-add-transformation-target-to-equations'
import { convertImportantAndBlockquoteToBox } from './20220625202000-convert-important-and-blockquote-to-box'
import { convertTableToSerloTable } from './20230526090001-convert-table-to-serlo-table'
import {
  migrateEquationsState,
  LegacyEquationsPluginState,
} from './20201101234700-migrate-equations'

createEdtrIoMigration({
  exports: module.exports,
  migrateState: convertEdtrIo,
  migrationName: '2023-09-17-upgrade-all-edtr-io-states',
})

function convertEdtrIo(content: unknown) {
  return f.pipe(
    content,
    migrateEquations,
    addFirstExplanationToEquation,
    addTransformationTargetToEquation,
    addImageCaption,
    convertImportantAndBlockquoteToBox,
    convertTableToSerloTable,
    removeLayoutPlugins,
  )
}

const LegacyEquationsState = t.type({
  steps: t.array(
    t.type({
      left: t.type({ plugin: t.literal('text') }),
      right: t.type({ plugin: t.literal('text') }),
      transform: t.type({ plugin: t.literal('text') }),
      sign: t.string,
    }),
  ),
})

const migrateEquations = replacePluginState({
  equation: ({ state }) => {
    if (LegacyEquationsState.is(state)) {
      return migrateEquationsState(
        state as unknown as LegacyEquationsPluginState,
      )
    } else {
      return document
    }
  },
})

const PluginDecoder = t.type({ plugin: t.string, state: t.unknown })

const RowsPluginDecoder = t.type({
  plugin: t.literal('rows'),
  state: t.array(PluginDecoder),
})

const LayoutPluginDecoder = t.type({
  plugin: t.literal('layout'),
  state: t.array(
    t.type({
      width: t.number,
      child: t.unknown,
    }),
  ),
})

const removeLayoutPlugins = transformPlugins({
  layout: (value) => {
    if (LayoutPluginDecoder.is(value)) {
      return value.state.flatMap(({ child }) => {
        if (RowsPluginDecoder.is(child)) {
          return child.state
        } else if (PluginDecoder.is(child)) {
          return [child]
        } else {
          throw new Error(
            `Illegal value (remove layout plugin): ${JSON.stringify(value)}`,
          )
        }
      })
    } else {
      throw new Error(
        `Illegal value (remove layout plugin): ${JSON.stringify(value)}`,
      )
    }
  },
})
