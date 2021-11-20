import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '/__tests__/*/.*\\.spec.ts$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['/**/*.{js,ts}'],
  globalSetup: '<rootDir>/__tests__/setup.ts',
  setupFilesAfterEnv: ['<rootDir>/__tests__/server.ts'],
  globalTeardown: '<rootDir>/__tests__/teardown.ts',
  reporters: ['default', '<rootDir>/__tests__/customReporter.ts'],
  globals: {
    'ts-jest': {},
    'testData': {}
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleDirectories: ['src', 'node_modules'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
};

export default config;
