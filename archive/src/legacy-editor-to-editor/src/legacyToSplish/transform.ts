import { Legacy, LegacyRow } from '../splishToEdtr/types'

const getCellsFromRow = (row: LegacyRow) =>
  row.map((cell) => ({
    size: Math.floor(cell.col / 2),
    raw: cell.content,
  }))

const transform = (input: Legacy) => {
  if (typeof input === 'string') {
    return {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw: input,
                },
              ],
            },
          ],
        },
      ],
    }
  }

  return {
    cells: [
      {
        rows: input.map((row) => ({
          cells: getCellsFromRow(row),
        })),
      },
    ],
  }
}

export default transform
