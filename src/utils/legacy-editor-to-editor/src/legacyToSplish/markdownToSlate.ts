import { ContentCell, Plugin } from '../splishToEdtr/types'
import { SplishTextState } from './createPlugin'
import renderMarkdown from './markdownToHtml'

const markdownToSlate = (markdown: string): ContentCell<SplishTextState> => ({
  content: {
    plugin: { name: Plugin.Text, version: '0.0.0' },
    state: {
      importFromHtml: renderMarkdown(markdown),
    },
  },
})
export default markdownToSlate
