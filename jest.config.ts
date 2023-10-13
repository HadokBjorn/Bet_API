/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.(test|spec).ts'],
  setupFiles: ['<rootDir>/tests/setup-envs.ts'],
 /*  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/tests/$1",
    "axios": "axios/dist/node/axios.cjs"
  }, */
  restoreMocks: true,
};

export default config;
