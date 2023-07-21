/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
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
