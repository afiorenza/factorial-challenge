import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  moduleNameMapper: { 
    '@/(.+)': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom'
};

export default config;
