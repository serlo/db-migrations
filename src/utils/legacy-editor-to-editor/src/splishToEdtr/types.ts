export enum Plugin {
  AlphabetSort = '@serlo-org/alphabet-sort',
  Anchor = '@serlo-org/anchor',
  Blockquote = '@serlo-org/blockquote',
  Equations = '@serlo-org/equations',
  Geogebra = '@serlo-org/geogebra',
  H5p = '@serlo-org/h5p',
  Highlight = '@serlo-org/highlight',
  Hint = '@serlo-org/hint',
  Image = '@splish-me/image',
  Injection = '@serlo-org/injection',
  InputExercise = '@serlo-org/input-exercise',
  License = '@serlo-org/license',
  MatchingExercise = '@serlo-org/matching-exercise',
  ScMcExercise = '@serlo-org/sc-mc-exercise',
  Solution = '@serlo-org/solution',
  Spoiler = '@serlo-org/spoiler',
  StepByStep = '@serlo-org/step-by-step',
  Table = '@serlo-org/table',
  Text = '@splish-me/slate',
}
export type Legacy = LegacyRow[] | string

export type LegacyRow = {
  col: number
  content: string
}[]

export type Splish = {
  id?: string
  cells: Cell[]
}
export type Row = Splish

export type Cell = RowCell | ContentCell

type RowCell = {
  id?: string
  size?: number
  rows: Row[]
}

export type ContentCell<S = unknown> = {
  id?: string
  size?: number
  inline?: null
  content: {
    plugin: SplishPlugin
    state: S
  }
}

export function isContentCell(cell: Cell): cell is ContentCell {
  const c = cell as ContentCell
  return typeof c.content !== 'undefined'
}

type SplishPlugin = { name: Plugin | 'code'; version?: string }

export type Edtr = RowsPlugin | LayoutPlugin | OtherPlugin

export type RowsPlugin = { plugin: 'rows'; state: Edtr[] }
export type LayoutPlugin = {
  plugin: 'layout'
  state: { child: Edtr; width: number }[]
}

export type OtherPlugin = {
  plugin:
    | 'anchor'
    | 'article'
    | 'blockquote'
    | 'error'
    | 'exercise'
    | 'geogebra'
    | 'highlight'
    | 'image'
    | 'important'
    | 'injection'
    | 'inputExercise'
    | 'spoiler'
    | 'scMcExercise'
    | 'solution'
    | 'table'
    | 'text'
    | 'video'
  state: unknown
}

export function isSplish(content: Legacy | Splish): content is Splish {
  return (content as Splish).cells !== undefined
}

export function isEdtr(content: Legacy | Splish | Edtr): content is Edtr {
  return (content as Edtr).plugin !== undefined
}
