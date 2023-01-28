/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10 * 1000,
  globalSetup: './test/globalSetup.ts',
  globalTeardown: './test/globalTeardown.ts',
};
