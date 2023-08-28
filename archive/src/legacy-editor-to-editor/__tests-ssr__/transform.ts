/* eslint-env jest */
import { expect } from './common'
import transform from '../src/legacyToSplish/transform'
import { Legacy } from '../src/splishToEdtr'

describe('Transformes Serlo Layout to new Layout', () => {
  test('Simple Layout', () => {
    createTestCase({
      input: [
        [
          {
            col: 24,
            content: 'Lorem ipsum',
          },
        ],
        [
          {
            col: 24,
            content: 'dolor sit amet.',
          },
        ],
      ],
      output: {
        cells: [
          {
            rows: [
              {
                cells: [{ size: 12, raw: 'Lorem ipsum' }],
              },
              {
                cells: [{ size: 12, raw: 'dolor sit amet.' }],
              },
            ],
          },
        ],
      },
    })
  })

  test('Two-Column Layout', () => {
    createTestCase({
      input: [
        [
          {
            col: 12,
            content: 'Lorem ipsum',
          },
          {
            col: 12,
            content: 'dolor adipiscing amet',
          },
        ],
      ],
      output: {
        cells: [
          {
            rows: [
              {
                cells: [
                  { size: 6, raw: 'Lorem ipsum' },
                  { size: 6, raw: 'dolor adipiscing amet' },
                ],
              },
            ],
          },
        ],
      },
    })
  })

  test('Two-column layout with odd column size', () => {
    createTestCase({
      input: [
        [
          {
            col: 5,
            content: 'Lorem ipsum',
          },
          {
            col: 19,
            content: 'dolor adipiscing amet',
          },
        ],
      ],
      output: {
        cells: [
          {
            rows: [
              {
                cells: [
                  { size: 2, raw: 'Lorem ipsum' },
                  { size: 9, raw: 'dolor adipiscing amet' },
                ],
              },
            ],
          },
        ],
      },
    })
  })

  function createTestCase({
    input,
    output,
  }: {
    input: Legacy
    output: ReturnType<typeof transform>
  }) {
    expect(transform(input), 'to equal', output)
  }
})
