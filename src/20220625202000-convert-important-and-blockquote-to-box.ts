import {
  createEdtrIoMigration,
  replacePlugins,
  Plugin,
  Transformation,
} from './utils'

createEdtrIoMigration({
  exports: module.exports,
  migrateState: replacePlugins({
    important: convertToBox,
    blockquote: convertToBox,
  }),
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
