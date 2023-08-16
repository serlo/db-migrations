import type { Config } from '@jest/types'

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
}

export default jestConfig
