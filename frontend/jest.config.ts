import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  moduleNameMapper: { 
    '@/(.+)': '<rootDir>/src/$1',
    '@test-utils/(.+)': '<rootDir>/test-utils/$1'
  },
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/src/**/__tests__/*.test.ts?(x)'
  ],
  testEnvironment: 'jest-environment-jsdom'
};

export default config;
