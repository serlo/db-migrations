import { function as f } from 'fp-ts'
import { createEdtrIoMigration } from './utils'

import { addImageCaption } from './20220517163100-add-image-caption'
import { addFirstExplanationToEquation } from './20210923155000-add-first-explanation-to-equation'
import { addTransformationTargetToEquation } from './20210923231900-add-transformation-target-to-equations'
import { convertImportantAndBlockquoteToBox } from './20220625202000-convert-important-and-blockquote-to-box'
import { convertTableToSerloTable } from './20230526090001-convert-table-to-serlo-table'
import {
  migrateEquations,
  removeLayoutPlugins,
} from './20230723223800-convert-legacy-revisions'

createEdtrIoMigration({
  exports: module.exports,
  migrateState: convertEdtrIo,
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
