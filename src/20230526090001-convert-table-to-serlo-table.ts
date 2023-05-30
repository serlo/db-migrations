import { converter } from '@serlo/markdown'
// eslint-disable-next-line import/no-deprecated
import { parseDOM } from 'htmlparser2'
import { createEdtrIoMigration, replacePlugins, Plugin } from './utils'

createEdtrIoMigration({
  exports,
  migrateState: replacePlugins({
    table({ plugin }) {
      if (typeof plugin.state !== 'string') {
        throw new Error('plugin state is not a string')
      }
      const serloTable = convertTable(plugin as EdtrPluginTable) ?? plugin

      return { plugin: 'table', state: plugin.state + ' ' }
    },
  }),
  dryRun: true,
})

export function convertTable(
  legacyState: EdtrPluginTable
): ReturnType<typeof convertHTMLtoState> {
  const html = converter.makeHtml(legacyState.state)
  return convertHTMLtoState(html)
}

function convertHTMLtoState(
  html: string
): EdtrPluginSerloTable | EdtrPluginText | undefined {
  // eslint-disable-next-line import/no-deprecated
  const dom = parseDOM(html) as unknown as LegacyNode[]
  // console.log(dom)

  const table = dom[0].children.filter((child) => child.type === 'tag')[0]
  if (!table) {
    console.log('Invalid table, replacing with empty text plugin!')
    return { plugin: 'text' } as EdtrPluginText
  }
  if (table.name !== 'table') {
    if (
      table.name === 'span' &&
      (table.attribs.class === 'math' || table.attribs.class === 'mathInline')
    ) {
      // console.log('hacked math, replacing!')
      const mathContent =
        table.children[0]?.data
          ?.replace(/%%/g, '')
          .replace('$$', '')
          .replace('$$', '') ?? ''
      return {
        plugin: 'text',
        state: [
          {
            type: 'p',
            children: [
              {
                type: 'math',
                src: mathContent,
                inline: true,
                children: [{ text: mathContent }],
              },
            ],
          },
        ],
      }
    } else {
      console.log('table misused for something else check!!')
      console.log(table.attribs)
      console.log(table.name)
      return undefined
    }
  }

  const tHeadAndTBody = table.children.filter((child) => child.type === 'tag')
  if (tHeadAndTBody.length !== 2) {
    console.log('Unexpected state (no header or body), skipping this table!')
    return undefined
  }

  const rows = [
    ...tHeadAndTBody[0].children,
    ...tHeadAndTBody[1].children,
  ].filter((child) => child.type === 'tag')

  const convertedRows = rows.map((row) => {
    const columns = row.children
      .filter((col) => col.type === 'tag')
      .map((col): Col => ({ content: convertCellContent(col) }))
    return {
      columns,
    }
  })

  const hasEmptyHeaderRow = convertedRows[0].columns.every(
    (cell) => !(cell.content as object).hasOwnProperty('state')
  )

  // remove empty headers
  const trimmedRows = hasEmptyHeaderRow ? convertedRows.slice(1) : convertedRows

  const colLength = trimmedRows.reduce(
    (acc, { columns }) => Math.max(columns.length, acc),
    0
  )

  const finalRows = trimmedRows.map(({ columns }) => {
    if (columns.length === colLength) return { columns }

    const oldLength = columns.length
    columns.length = colLength

    return {
      columns: columns.fill({ content: { plugin: 'text' } }, oldLength),
    }
  })

  return {
    plugin: 'serloTable',
    state: {
      tableType: hasEmptyHeaderRow
        ? TableType.OnlyRowHeader
        : TableType.OnlyColumnHeader,
      rows: finalRows,
    },
  }
}

type Col = EdtrPluginSerloTable['state']['rows'][0]['columns'][0]

function convertCellContent(cell: LegacyNode) {
  if (cell.children.length === 0) return { plugin: 'text' }
  if (cell.children.length > 1 || cell.children[0].name !== 'p') {
    console.log('unexpected state, cell will be empty')
    return { plugin: 'text' }
  }
  const contentNodes = cell.children[0].children
  const converted = contentNodes.map(convertContentNode)

  if (
    converted.length === 1 &&
    converted[0].hasOwnProperty('plugin') &&
    //@ts-expect-error ooo
    converted[0].plugin === 'image'
  ) {
    return converted[0]
  }

  return { plugin: 'text', state: [{ type: 'p', children: converted }] }
}

function convertContentNode(
  node: LegacyNode
): SlateTextElement | SlateBlockElement | [] | EdtrPluginImage {
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

    if (node.name === 'a' && node.attribs.href) {
      if (
        node.children[0].data?.includes('%') ||
        node.children[0].data?.includes('$$')
      )
        console.log(
          'content: table has link with formula that will not be converted! check manually'
        )
      return {
        type: 'a',
        href: node.attribs.href,
        children: [{ text: node.children[0].data ?? '' }],
      }
    }

    if (node.name === 'span' && node.attribs.class === 'mathInline') {
      if (
        node.children.length !== 1 ||
        !node.children[0].hasOwnProperty('children')
      ) {
        // console.log(node.children)
        console.log(
          'content: mathInline has unexpected state, content will be empty'
        )
        return { text: '' }
      }

      const mathContent =
        node.children[0].children[0].data?.replace(/%%/g, '') ?? ''
      // not working as expected?!
      return {
        type: 'math',
        src: mathContent,
        inline: true,
        children: [{ text: mathContent }], //???
      }
    }

    if (node.name === 'span' && node.attribs.class === 'math') {
      if (node.children.length !== 1) {
        console.log('content: math has unexpected state, content will be empty')
        return { text: '' }
      }
      const mathContent =
        node.children[0].data
          ?.replace(/%%/g, '')
          .replace('$$', '')
          .replace('$$', '') ?? ''
      return {
        type: 'math',
        src: mathContent,
        inline: true,
        children: [{ text: mathContent }], //???
      }
    }

    if (node.name === 'code') {
      if (
        !node.children ||
        node.children.length !== 1 ||
        node.children[0].type !== 'text' ||
        !node.children[0].data
      ) {
        console.log('content: math has unexpected state, content will be empty')
        return { text: '' }
      }
      return {
        text: node.children[0].data,
        code: true,
      }
    }

    if (node.name === 'img') {
      if (!node.attribs || !node.attribs.src) {
        console.log('content: img has unexpected state, content will be empty')
        return { text: '' }
      }

      return {
        plugin: 'image',
        state: { src: node.attribs.src, alt: node.attribs.alt },
      } as EdtrPluginImage
    }

    console.log('content: unsupported tag, content will be empty')
    console.log(node.name)
    // console.log(node)
    return { text: '' }
  }

  console.log('content: unsupported type, content will be empty')
  const type = node.type
  console.log({ type })
  // console.log(node)

  return { text: '' }
}

// COPIED TYPES
// =================================================

interface EdtrPluginTable {
  plugin: 'table'
  state: string
}

interface EdtrPluginSerloTable {
  plugin: 'serloTable'
  state: {
    rows: {
      columns: {
        content: unknown
      }[]
    }[]
    tableType: TableType
  }
}

// Result of the htmlparser
export interface LegacyNode {
  type: string
  name: string
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
enum TableType {
  OnlyColumnHeader = 'OnlyColumnHeader',
  OnlyRowHeader = 'OnlyRowHeader',
  ColumnAndRowHeader = 'RowAndColumnHeader',
}

interface SlateTextElement {
  text: string
  strong?: true
  em?: true
  code?: true
  color?: number
}

type SlateBlockElement = CustomElement

export type CustomElement =
  | Paragraph
  | List
  | ListItem
  | ListItemText
  | Heading
  | Link
  | MathElement

export interface Heading {
  type: 'h'
  level: 1 | 2 | 3
  children: CustomText[]
}

export interface Paragraph {
  type: 'p'
  children: (CustomText | MathElement)[] // TODO Restrict this to only inline MathElement
}

export interface Link {
  type: 'a'
  href: string
  children: CustomText[]
}

export enum ListElementType {
  UNORDERED_LIST = 'unordered-list',
  ORDERED_LIST = 'ordered-list',
  LIST_ITEM = 'list-item',
  LIST_ITEM_TEXT = 'list-item-child',
}

export interface List {
  type: ListElementType.UNORDERED_LIST | ListElementType.ORDERED_LIST
  children: ListItem[]
}

export interface ListItem {
  type: ListElementType.LIST_ITEM
  children: [ListItemText] | [ListItemText, List]
}

export interface ListItemText {
  type: ListElementType.LIST_ITEM_TEXT
  children: CustomText[]
}

export interface MathElement {
  type: 'math'
  src: string
  inline: boolean
  children: CustomText[]
}

export interface CustomText {
  text: string
  strong?: true
  em?: true
  code?: true
  color?: number
}

interface EdtrPluginImage {
  plugin: 'image'
  state: {
    src: string
    alt?: string
  }
}

interface EdtrPluginText {
  plugin: 'text'
  state: CustomElement[] | CustomText[]
}
