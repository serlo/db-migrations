import * as t from 'io-ts'

import { createMigration } from './utils'

/**
 * Migrates the Edtr.io states of all equations plugins to the new format.
 * THIS IS AN IRREVERSIBLE MIGRATION!
 */
createMigration(module.exports, {
  up: async (db) => {
    try {
      interface Row {
        id: number
        value: string
        revision: number
      }

      async function processResults(results: Row[]) {
        try {
          if (results.length === 0) return

          const [field, ...remainingResults] = results
          const state = JSON.parse(field.value)
          const newState = JSON.stringify(migrateState(state))

          if (field.value !== newState) {
            await db.runSql(
              `UPDATE entity_revision_field SET value = ? WHERE id = ?`,
              newState,
              field.id,
            )
            console.log('Updated revision', field.revision)
          }
          await processResults(remainingResults)
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.stack)
            console.error(results[0].id)
          }
        }
      }

      const results = await db.runSql<Row[]>(`
      SELECT erf.id, erf.value, er.id as revision
      FROM entity_revision_field erf
        LEFT JOIN entity_revision er on erf.entity_revision_id = er.id
        LEFT JOIN entity e on er.repository_id = e.id
      WHERE erf.field = 'content'
        AND erf.value LIKE '%{"plugin":"equations"%'
    `)
      await processResults(results)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.stack)
      }
    }
  },
})

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

function migrateState(document: { plugin: string; state: any }): {
  plugin: string
  state: any
} {
  switch (document.plugin) {
    case 'equations':
      if (LegacyEquationsState.is(document.state)) {
        return migrateEquationsState(
          document.state as unknown as LegacyEquationsPluginState,
        )
      } else {
        return document
      }
    // Layout plugins
    case 'blockquote':
      return {
        ...document,
        state: migrateState(document.state),
      }
    case 'exercise':
      return {
        ...document,
        state: {
          ...document.state,
          content: migrateState(document.state.content),
          interactive: document.state.interactive
            ? (migrateState(document.state.interactive) as {
                plugin: 'scMcExercise' | 'inputExercise'
                state: unknown
              })
            : undefined,
        },
      }
    case 'important':
      return {
        ...document,
        state: migrateState(document.state),
      }
    case 'inputExercise':
      return {
        ...document,
        state: {
          ...document.state,
          answers: document.state.answers.map((answer: any) => {
            return {
              ...answer,
              feedback: migrateState(answer.feedback),
            }
          }),
        },
      }
    case 'layout':
      return {
        ...document,
        state: document.state.map((row: any) => {
          return {
            ...row,
            child: migrateState(row.child),
          }
        }),
      }
    case 'multimedia':
      return {
        ...document,
        state: {
          ...document.state,
          explanation: migrateState(document.state.explanation),
          multimedia: migrateState(document.state.multimedia),
        },
      }
    case 'rows':
      return {
        ...document,
        state: document.state.map((row: any) => {
          return migrateState(row)
        }),
      }
    case 'scMcExercise':
      return {
        ...document,
        state: {
          ...document.state,
          answers: document.state.answers.map((answer: any) => {
            return {
              ...answer,
              content: migrateState(answer.content),
              feedback: migrateState(answer.feedback),
            }
          }),
        },
      }
    case 'spoiler':
      return {
        ...document,
        state: {
          ...document.state,
          content: migrateState(document.state.content),
        },
      }
    case 'solution':
      return {
        ...document,
        state: {
          ...document.state,
          strategy: migrateState(document.state.strategy),
          steps: migrateState(document.state.steps),
        },
      }

    // Content plugins
    case 'anchor':
    case 'deprecated':
    case 'error':
    case 'geogebra':
    case 'highlight':
    case 'image':
    case 'injection':
    case 'separator':
    case 'table':
    case 'text':
    case 'video':
    // Newer plugins shouldn't have old equations
    case 'box':
    case 'article':
    case 'serloTable':
      return document
    default:
      console.log(document)
      throw new Error(`Unexpected plugin: ${document.plugin}`)
  }
}

interface LegacyEquationsPluginState {
  steps: {
    left: {
      plugin: 'text'
      state: any
    }
    sign: string
    right: {
      plugin: 'text'
      state: any
    }
    transform: {
      plugin: 'text'
      state: any
    }
  }[]
}

export function migrateEquationsState(state: LegacyEquationsPluginState): {
  plugin: string
  state: any
} {
  try {
    return {
      plugin: 'equations',
      state: {
        steps: state.steps.map((step) => {
          const { left, sign, right, transform } = step
          return {
            left: extractSingleFormulaFromText(left),
            sign: sign,
            right: extractSingleFormulaFromText(right),
            ...extractTransformOrExplanationFromText(transform),
          }
        }),
      },
    }
  } catch (e) {
    console.log(state)
    const error = e as Error
    console.log('Failed to', error.message)
    return {
      plugin: 'deprecated',
      state: {
        plugin: 'equations',
        state,
      },
    }
  }
}

function extractSingleFormulaFromText(textState: { state: any }): string {
  const paragraphs = textState.state.filter((paragraph: any) => {
    return (
      paragraph.type === 'p' && getCleanChildren(paragraph.children).length > 0
    )
  })

  if (paragraphs.length === 0) return ''
  if (paragraphs.length !== 1) {
    throw new Error('text has more than one paragraph')
  }

  const paragraph = paragraphs[0]

  if (paragraph.type !== 'p') {
    throw new Error('text has block that is not a paragraph')
  }

  const children = getCleanChildren(paragraph.children)

  if (children.length === 0) return ''

  return children
    .map((child) => {
      if (child.type === 'math') {
        return children[0].src
      } else if (child.text) {
        return child.text
      } else {
        throw new Error('text contains unexpected child')
      }
    })
    .join('')
}

function extractTransformOrExplanationFromText(textState: {
  plugin: string
  state: any
}): {
  transform: string
  explanation: { plugin: string; state?: any }
} {
  if (textState.state.length !== 1) return noTransform()
  const paragraph = textState.state[0]
  if (paragraph.type !== 'p') return noTransform()

  const cleanChildren = getCleanChildren(paragraph.children)

  if (cleanChildren.length === 1 && cleanChildren[0].type === 'math') {
    const src = cleanChildren[0].src
    if (src.startsWith('|') || src.startsWith('\\vert')) {
      return transform(src.replace(/^(\||\\vert)(\\:)*/, '').trim())
    }
    if (src.startsWith('\\left|')) {
      return transform(
        src
          .replace(/^\\left\|/, '')
          .replace(/\\right\.$/, '')
          .trim(),
      )
    }
  }

  return noTransform()

  function noTransform() {
    return {
      transform: '',
      explanation: textState,
    }
  }

  function transform(src: string) {
    return {
      transform: src,
      explanation: {
        plugin: 'text',
      },
    }
  }
}

function getCleanChildren(children: any[]): any[] {
  return children.filter((child) => {
    return (
      Object.keys(child).length !== 0 &&
      child['text'] !== '' &&
      child['text'] !== ' '
    )
  })
}
