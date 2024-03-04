import {
  createEdtrIoMigration,
  replacePlugins,
  Plugin,
  Transformation,
} from './utils'

export const convertImportantAndBlockquoteToBox = replacePlugins({
  important: convertToBox,
  blockquote: convertToBox,
})

createEdtrIoMigration({
  exports: module.exports,
  migrateState: convertImportantAndBlockquoteToBox,
})

function convertToBox({
  plugin,
  applyChangeToChildren,
}: {
  plugin: Plugin
  applyChangeToChildren: Transformation
}) {
  return {
    plugin: 'box',
    state: {
      title: {
        plugin: 'text',
        state: [{ type: 'p', children: [{}] }],
      },
      content: {
        plugin: 'rows',
        state: [applyChangeToChildren(plugin.state)],
      },
      type: plugin.plugin === 'blockquote' ? 'quote' : 'blank',
      anchorId: `box${Math.floor(10000 + Math.random() * 90000)}`,
    },
  }
}
