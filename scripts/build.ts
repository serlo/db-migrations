import * as esbuild from 'esbuild'
import * as fs from 'fs'
import * as path from 'path'

import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const root = path.join(__dirname, '..')
const src = path.join(root, 'src')
const dist = path.join(root, process.env.BUILD_OUTDIR ?? 'dist')

exec()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

async function exec() {
  for (const arg of process.argv.slice(2)) {
    const file = path.resolve(arg)

    if (!fs.statSync(file).isFile() || path.dirname(file) !== src) {
      throw new Error(`File ${file} does not exist`)
    }

    const basename = path.basename(file, '.ts')
    const outfile = path.join(dist, `${basename}.js`)

    await esbuild.build({
      entryPoints: [file],
      treeShaking: true,
      minifySyntax: false,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      target: 'node18',
      outfile,
    })
  }
}
