import { converter } from '@serlo/markdown'
import { parseDOM } from 'htmlparser2'

import { createEdtrIoMigration, replacePlugins, Plugin } from './utils'

createEdtrIoMigration({
  exports,
  migrateState: replacePlugins({
    table({ plugin }) {
      if (typeof plugin.state !== 'string') {
        throw new Error('plugin state is not a string')
      }

      const html = converter.makeHtml(plugin.state)

      return convertTable(html)
    },
  }),
})

interface LegacyNode {
  type: string
  name: string
  next: LegacyNode
  attribs: {
    class?: string
    href?: string
    src?: string
    alt?: string
    id?: string
  }
  children: LegacyNode[]
  text?: string
  data?: string
}

function convertTable(html: string): Plugin {
  const dom = parseDOM(html) as unknown as LegacyNode[]

  let table = dom[0].children.filter((child) => child.type === 'tag')[0]

  if (dom[0].next?.name == 'table') {
    table = dom[0].next
  }

  if (!table || table.name !== 'table') {
    // FIXME: don't seem right...
    if (table && table.name === 'code') {
      return {
        plugin: 'text',
        state: table.data,
      }
    }

    if (
      table &&
      table.name === 'span' &&
      (table.attribs.class?.includes('mathInline') ||
        table.attribs.class?.includes('math'))
    ) {
      return {
        plugin: 'text',
        state: convertContentNode(table),
      }
    }

    const child = dom[0].children.filter((child) => child.type === 'text')[0]
    if (child.type === 'text') {
      // some data are like '| Tables | Are | Cool', they are classified as text
      // TODO: Check if this solution is ok, maybe legacyTable is better...
      return {
        plugin: 'text',
        state: child.data,
      }
    }
    throw new Error('table is not defined')
  }

  const tHeadAndTBody = table.children.filter((child) => child.type === 'tag')
  if (tHeadAndTBody.length !== 2) {
    throw new Error('table has empty length')
  }

  const rows = [
    ...tHeadAndTBody[0].children,
    ...tHeadAndTBody[1].children,
  ].filter((child) => child.type === 'tag')

  const convertedRows = rows.map((row) => {
    const columns = row.children
      .filter((col) => col.type === 'tag')
      .map((col) => {
        return {
          content: {
            plugin: 'text',
            state: convertCellContent(col),
          },
        }
      })
    return {
      columns,
    }
  })

  return {
    plugin: 'serloTable',
    state: {
      tableType: 'OnlyColumnHeader',
      rows: convertedRows,
    },
  }
}

function convertCellContent(cell: LegacyNode) {
  if (cell.children.length === 0) return []
  if (cell.children.length > 1) {
    throw 'unknown state'
  }
  const contentNodes = cell.children[0].children
  // TODO: naming
  const converted = contentNodes
    ? { children: contentNodes.map(convertContentNode) }
    : {}
  // console.log([{ type: 'p', children: [converted] }])
  return [{ plugin: 'text', state: [{ type: 'p', ...converted }] }]
}

function convertContentNode(node: LegacyNode) {
  //handle code? 0: {text: "Test", code: true}

  if (node.type === 'text') return { text: node.data ?? '' }

  if (node.type === 'tag') {
    // console.log(node.name)
    if (node.name === 'br') {
      return { text: ' ' }
    }

    if (node.name === 'strong') {
      return { text: node.children[0].data ?? '', strong: true }
    }

    if (node.name === 'em') {
      return { text: node.children[0].data ?? '', em: true }
    }

    if (node.name === 'span' && node.attribs.class === 'mathInline') {
      if (node.children.length !== 1) {
        console.log('mathInline: unexpected state, skipping')
        return { text: '' }
      }

      // TODO: before it was ...children[0].children[0]... ask if it can be so
      const mathContent = node.children[0].data?.replace(/%%/, '') ?? ''

      return {
        type: 'math',
        src: mathContent,
        inline: true,
        children: [{ text: mathContent }], //???
      }
    }
    console.log('unsupported tag')
    console.log(node.name)
    return []
  }

  console.log('unsupported type')
  console.log(node.type)
  console.log(node)

  // FIXME
  return { text: 'test' }
}
