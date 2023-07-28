import { Cell } from '../splishToEdtr/types'
import createPlugins from './createPlugin'
import normalizeMarkdown from './normalizeMarkdown'
import transform from './transform'

const splitMarkdown = (markdown: string) =>
  createPlugins(normalizeMarkdown(markdown))

type Leaf = { size: number; raw: string }
type CellBeforeSplit = Leaf | { rows: RowBeforeSplit[] }
type RowBeforeSplit = { cells: CellBeforeSplit[] }

function isLeaf(cell: CellBeforeSplit): cell is Leaf {
  const c = cell as Leaf
  return typeof c.raw !== 'undefined'
}
function splitCell(cell: CellBeforeSplit): Cell {
  if (isLeaf(cell)) {
    return {
      size: cell.size,
      rows: splitMarkdown(cell.raw),
    }
  } else {
    const { rows = [] } = cell
    return {
      ...cell,
      rows: rows.map(splitRow),
    }
  }
}

function splitRow(row: RowBeforeSplit) {
  return {
    ...row,
    cells: row.cells.map(splitCell),
  }
}

function split(input: ReturnType<typeof transform>) {
  return {
    ...input,
    cells: input.cells.map(splitCell),
  }
}

export default split
