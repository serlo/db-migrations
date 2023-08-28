import { expect, expectSplishSlate } from './common'
import markdownToSlate from '../src/legacyToSplish/markdownToSlate'

const cases: {
  description: string
  input: string
  output: ReturnType<typeof markdownToSlate>
}[] = [
  {
    description: 'Transform markdown header to slate plugin',
    input: '# header',
    output: expectSplishSlate('<h1 id="header">header</h1>'),
  },
  {
    description: 'Transform bold paragraph to slate plugin',
    input: '**bold text**',
    output: expectSplishSlate('<p><strong>bold text</strong></p>'),
  },
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(markdownToSlate(testcase.input), 'to equal', testcase.output)
    })
  })
})
