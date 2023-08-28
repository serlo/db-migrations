import { convertPlugin } from '../../src/splishToEdtr/convertPlugins'
import { expect } from '../common'
import {
  SplishImageState,
  SplishSpoilerState,
} from '../../src/legacyToSplish/createPlugin'
import { ContentCell, Plugin } from '../../src/splishToEdtr/types'

describe('plugin convert works', () => {
  it('works with Spoiler wrapping an image', () => {
    const image: ContentCell<SplishImageState> = {
      content: {
        plugin: { name: Plugin.Image },
        state: {
          description: 'Some image description',
          src: 'https://assets.serlo.org/some/asset',
          title: '',
        },
      },
    }
    const spoiler: ContentCell<SplishSpoilerState> = {
      content: {
        plugin: { name: Plugin.Spoiler },
        state: {
          title: 'title',
          content: {
            type: '@splish-me/editor-core/editable',
            state: {
              id: '1',
              cells: [
                {
                  id: '2',
                  rows: [
                    {
                      cells: [image],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    }

    const expected = {
      plugin: 'spoiler',
      state: {
        content: {
          plugin: 'rows',
          state: [
            {
              plugin: 'image',
              state: {
                alt: 'Some image description',
                link: undefined,
                maxWidth: undefined,
                src: 'https://assets.serlo.org/some/asset',
              },
            },
          ],
        },
        title: 'title',
      },
    }
    expect(convertPlugin(spoiler), 'to equal', expected)
  })
})
