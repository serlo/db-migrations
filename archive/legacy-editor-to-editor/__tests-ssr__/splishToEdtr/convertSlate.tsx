import { htmlToSlate } from '../../src/splishToEdtr/convertSlate'

describe('slate serializer and deserializer work', () => {
  test('can handle empty paragraphs', () => {
    const html = '<p></p>'

    expect(htmlToSlate(html)).toEqual({
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [{ object: 'block', type: 'paragraph', data: {}, nodes: [] }],
      },
    })
  })

  test('works with normal text.', () => {
    const html = 'This was created with'

    expect(htmlToSlate(html)).toEqual({
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [
          {
            object: 'block',
            data: {},
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                text: 'This was created with',
                marks: [],
              },
            ],
          },
        ],
      },
    })
  })

  test('works with normal paragraphs and marks.', () => {
    const html = '<p>This was created with <strong>Splish</strong> editor.</p>'
    expect(htmlToSlate(html)).toEqual({
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            data: {},
            nodes: [
              {
                object: 'text',
                text: 'This was created with ',
                marks: [],
              },
              {
                object: 'text',
                text: 'Splish',
                marks: [{ type: '@splish-me/strong' }],
              },
              { object: 'text', text: ' editor.', marks: [] },
            ],
          },
        ],
      },
    })
  })

  test('works with list', () => {
    const html = '<ul><li><p>foo</p></li><li><p>bar</p></li></ul>'
    expect(htmlToSlate(html)).toEqual({
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'unordered-list',
            data: {},
            nodes: [
              {
                object: 'block',
                type: 'list-item',
                data: {},
                nodes: [
                  {
                    object: 'block',
                    type: 'list-item-child',
                    nodes: [
                      {
                        object: 'block',
                        type: 'paragraph',
                        data: {},
                        nodes: [
                          {
                            object: 'text',
                            text: 'foo',
                            marks: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                object: 'block',
                type: 'list-item',
                data: {},
                nodes: [
                  {
                    object: 'block',
                    type: 'list-item-child',
                    nodes: [
                      {
                        object: 'block',
                        type: 'paragraph',
                        data: {},
                        nodes: [
                          {
                            object: 'text',
                            text: 'bar',
                            marks: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    })
  })

  test('works with real html from splish slate', () => {
    const html =
      '<p>This was created with <strong>Splish</strong> editor.</p><ul><li><p>foo</p></li><li><p>bar</p></li></ul>'
    expect(htmlToSlate(html)).toEqual({
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            data: {},
            nodes: [
              {
                object: 'text',
                text: 'This was created with ',
                marks: [],
              },
              {
                object: 'text',
                text: 'Splish',
                marks: [{ type: '@splish-me/strong', data: undefined }],
              },
              {
                object: 'text',
                text: ' editor.',
                marks: [],
              },
            ],
          },
          {
            object: 'block',
            type: 'unordered-list',
            data: {},
            nodes: [
              {
                object: 'block',
                type: 'list-item',
                data: {},
                nodes: [
                  {
                    object: 'block',
                    type: 'list-item-child',
                    nodes: [
                      {
                        object: 'block',
                        type: 'paragraph',
                        data: {},
                        nodes: [
                          {
                            object: 'text',
                            text: 'foo',
                            marks: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                object: 'block',
                type: 'list-item',
                data: {},
                nodes: [
                  {
                    object: 'block',
                    type: 'list-item-child',
                    nodes: [
                      {
                        object: 'block',
                        type: 'paragraph',
                        data: {},
                        nodes: [
                          {
                            object: 'text',
                            text: 'bar',
                            marks: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    })
  })

  test('normalizes the slate state', () => {
    const html = '<p>Formula: <katexblock>a^2+b^2=c^2</katexblock></p>'

    expect(htmlToSlate(html)).toEqual({
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [{ object: 'text', text: 'Formula: ', marks: [] }],
            data: {},
          },
          {
            object: 'block',
            type: '@splish-me/katex-block',
            data: { formula: 'a^2+b^2=c^2', inline: false },
            nodes: [{ object: 'text', text: 'a^2+b^2=c^2', marks: [] }],
          },
        ],
      },
    })
  })
})
