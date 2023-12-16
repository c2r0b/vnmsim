const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/"
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  modulePaths: [
    '<rootDir>'
  ]
}