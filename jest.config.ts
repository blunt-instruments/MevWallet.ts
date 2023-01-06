import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  coverageDirectory: '.coverage',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
  },
};

export default config;

/** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   coverageDirectory: '.coverage',
//   verbose: true,
//   // transform: {
//   // '.*': ['ts-jest', { isolatedModules: true }],
//   // },
//   // globals: {
//   //   'ts-jest': {
//   //     isolatedModules: true,
//   //   },
//   // },
// };
