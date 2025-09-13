/** @type {import('jest').Config} */
const config = {
  // The environment in which the tests will be run
  testEnvironment: 'node',

  // Look for test files in all packages
  roots: ['<rootDir>/packages'],

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  verbose: true,

  passWithNoTests: true,
};

export default config;