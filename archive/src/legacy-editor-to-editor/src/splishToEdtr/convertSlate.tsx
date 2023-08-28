import * as React from 'react'
import Html, { Rule } from 'slate-html-serializer'
// @ts-ignore
import { parseFragment } from 'parse5'
import { Block, Inline, Mark, Value, ValueJSON } from 'slate'
import { normalize } from './normalize-slate'

/**
 * This file provides a serializer for the splish slate state to html
 * and a deserializer for html to edtr-io slate state.
 * All serializers use the node names of the splish editor.
 * All deserializers use the new node names defined in the following variables.
 */

export const createHeadingNode = (level: number) => `@splish-me/h${level}`
export const linkNode = '@splish-me/a'

export const orderedListNode = 'ordered-list'
export const unorderedListNode = 'unordered-list'
export const listItemNode = 'list-item'
export const listItemChildNode = 'list-item-child'

export const paragraphNode = 'paragraph'

export const strongMark = '@splish-me/strong'
export const emphasizeMark = '@splish-me/em'

export const katexBlockNode = '@splish-me/katex-block'
export const katexInlineNode = '@splish-me/katex-inline'

export function convertOldSlate(value: ValueJSON) {
  const serializer = new Html({
    rules: [
      headingSerializer,
      linkSerializer,
      listSerializer,
      paragraphSerializer,
      richTextSerializer,
      katexSerializer,
    ],
    defaultBlock: { type: paragraphNode },
    parseHtml: (html: string) => {
      return parseFragment(html) as HTMLElement
    },
  })

  return htmlToSlate(
    serializer.serialize(Value.fromJSON(value), {
      render: true,
    }),
  )
}
export function htmlToSlate(html: string) {
  const deserializer = new Html({
    rules: [
      headingDeserializer,
      linkDeserializer,
      listDeserializer,
      paragraphDeserializer,
      richTextDeserializer,
      katexDeserializer,
      {
        deserialize(el) {
          if (el.tagName && el.tagName.toLowerCase() === 'br') {
            return {
              object: 'text',
              text: '\n',
            }
          }

          if (el.nodeName === '#text') {
            // @ts-ignore
            if (el.value && el.value.match(/<!--.*?-->/)) return

            return {
              object: 'text',
              // @ts-ignore
              text: el.value,
            }
          }
        },
      },
    ],
    defaultBlock: { type: paragraphNode },
    parseHtml: (html: string) => {
      return parseFragment(html) as HTMLElement
    },
  })

  return normalize(deserializer.deserialize(html, { toJSON: true }))
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const headingDeserializer: Rule = {
  deserialize(el, next) {
    const match = el.tagName.toLowerCase().match(/h([1-6])/)

    if (match) {
      const level = parseInt(match[1], 10) as HeadingLevel

      return {
        object: 'block',
        type: createHeadingNode(level),
        nodes: next(el.childNodes),
      }
    }
  },
}

const linkDeserializer: Rule = {
  deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'a') {
      // @ts-ignore FIXME
      const attr = el.attrs.find(({ name }) => name === 'href')

      return {
        object: 'inline',
        type: linkNode,
        nodes: next(el.childNodes),
        data: {
          href: attr ? attr.value : '',
        },
      }
    }
  },
}

const listDeserializer: Rule = {
  deserialize(el, next) {
    switch (el.tagName.toLowerCase()) {
      case 'ol':
        return {
          object: 'block',
          type: orderedListNode,
          nodes: next(el.childNodes),
        }
      case 'ul':
        return {
          object: 'block',
          type: unorderedListNode,
          nodes: next(el.childNodes),
        }
      case 'li':
        return {
          object: 'block',
          type: listItemNode,
          nodes: [
            {
              object: 'block',
              type: listItemChildNode,
              nodes: next(el.childNodes),
            },
          ],
        }
    }
  },
}

const paragraphDeserializer: Rule = {
  deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'p') {
      return {
        object: 'block',
        type: paragraphNode,
        nodes: next(el.childNodes),
      }
    }
  },
}

const richTextDeserializer: Rule = {
  deserialize(el, next) {
    switch (el.tagName.toLowerCase()) {
      case 'strong':
      case 'b':
        return {
          object: 'mark',
          type: strongMark,
          nodes: next(el.childNodes),
        }
      case 'em':
      case 'i':
        return {
          object: 'mark',
          type: emphasizeMark,
          nodes: next(el.childNodes),
        }
    }
  },
}

const katexDeserializer: Rule = {
  deserialize(el, next) {
    switch (el.tagName.toLowerCase()) {
      case 'katexblock':
        return {
          object: 'block',
          type: katexBlockNode,
          data: {
            //@ts-ignore
            formula: el.childNodes[0].value,
            inline: false,
          },
          nodes: next(el.childNodes),
        }
      case 'katexinline':
        return {
          object: 'inline',
          type: katexInlineNode,
          data: {
            //@ts-ignore
            formula: el.childNodes[0].value,
            inline: true,
          },
          nodes: next(el.childNodes),
        }
      default:
        return
    }
  },
}

const headingSerializer: Rule = {
  serialize(obj, children) {
    const block = obj as Block

    if (block.object === 'block') {
      const match = block.type.match(/@splish-me\/h([1-6])/)

      if (match) {
        const level = parseInt(match[1], 10) as HeadingLevel

        return React.createElement(
          `h${level}`,
          {
            node: obj,
          },
          children,
        )
      }
    }
  },
}

const linkSerializer: Rule = {
  serialize(obj, children) {
    const block = obj as Inline

    if (block.object === 'inline' && block.type === linkNode) {
      const href = obj.data.get('href')
      return <a href={href}>{children}</a>
    }
  },
}

const listSerializer: Rule = {
  serialize(obj, children) {
    const block = obj as Block

    switch (block.type) {
      case '@splish-me/ul':
        return <ul>{children}</ul>
      case '@splish-me/ol':
        return <ol>{children}</ol>
      case '@splish-me/li':
        return <li>{children}</li>
    }
  },
}
const paragraphSerializer: Rule = {
  serialize(obj, children) {
    const block = obj as Block
    if (block.type === 'paragraph' || block.type === '@splish-me/p') {
      return <p>{children}</p>
    }
  },
}

const richTextSerializer: Rule = {
  serialize(obj, children) {
    const mark = obj as Mark
    if (mark.object === 'mark') {
      switch (mark.type) {
        case '@splish-me/strong':
          return <strong>{children}</strong>
        case '@splish-me/em':
          return <em>{children}</em>
      }
    }
  },
}

const katexSerializer: Rule = {
  serialize(obj, children) {
    const block = obj as Block
    const inline = obj as Inline

    if (block.object === 'block' && block.type === katexBlockNode) {
      const formula = obj.data.get('formula')
      // @ts-ignore
      return <katexblock>{formula}</katexblock>
    } else if (inline.object === 'inline' && inline.type === katexInlineNode) {
      const formula = obj.data.get('formula')
      // @ts-ignore
      return <katexinline>{formula}</katexinline>
    }
  },
}
