import * as R from 'ramda'
//@ts-ignore
import unexpected from 'unexpected'
import { ContentCell, Plugin } from '../src/splishToEdtr/types'
import { SplishTextState } from '../src/legacyToSplish/createPlugin'

const expectInstance = unexpected.clone()

/**
 * Remove all specified keys from an object, no matter how deep they are.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param input The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 * @return the object with removed keys
 */
const deepOmitKeys = (input: any, keys: (keyof typeof input)[]): void => {
  let obj = R.clone(input)
  let index
  for (let prop in obj) {
    // important check that this is objects own property
    // not from prototype prop inherited
    if (obj.hasOwnProperty(prop)) {
      switch (typeof obj[prop]) {
        case 'string':
          index = keys.indexOf(prop)
          if (index > -1) {
            delete obj[prop]
          }
          break
        case 'object':
          index = keys.indexOf(prop)
          if (index > -1) {
            delete obj[prop]
          } else {
            obj[prop] = deepOmitKeys(obj[prop], keys)
          }
          break
      }
    }
  }
  return obj
}

const ignoreIrrelevantKeys = (obj: any) => deepOmitKeys(obj, ['id'])

export const expect = <In, Out>(input: In, method: string, output: Out) => {
  expectInstance(
    ignoreIrrelevantKeys(input),
    method,
    ignoreIrrelevantKeys(output),
  )
}

export const expectSplishSlate = (
  html: string,
): ContentCell<SplishTextState> => ({
  content: {
    plugin: { name: Plugin.Text, version: '0.0.0' },
    state: {
      importFromHtml: html,
    },
  },
})

// Just so that Jest doesn't complain about an empty test suite
test('', () => {})
