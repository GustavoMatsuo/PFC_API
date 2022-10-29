/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@model": "<rootDir>./src/models",
    "@services": "<rootDir>./src/services",
    "@repositories": "<rootDir>./src/repositories",
    "@interfaces": "<rootDir>./src/interfaces"
  }
}