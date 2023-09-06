import { converter } from '@serlo/markdown'

const renderMarkdown = (input: string) => {
  let html = converter.makeHtml(input)
  html = html.replace(/"/gm, '"')
  return html
    .replace(
      /<span class="mathInline">%%(.*?)%%<\/span>/gm,
      '<katexinline>$1</katexinline>',
    )
    .replace(
      /<span class="math">\$\$(.*?)\$\$<\/span>/gm,
      '<katexblock>$1</katexblock>',
    )
    .replace(/\r?\n/gm, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<\/p><p>/g, '</p><p>&nbsp;</p><p>')
}
export default renderMarkdown
