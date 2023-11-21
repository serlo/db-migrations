module.exports = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
}
