module.exports = {
  globals: {
    window: true
  },
  rootDir: '.',
  coverageDirectory: './coverage',
  setupFiles: ['./jestsetup.js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/utils/testutils.tsx',
    'src/components/map/connectedMap.tsx',
    'src/views/planner/connectedPlanner.tsx',
    'src/views/routes/connectedRoutes.tsx',
    'src/services/'
  ],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^styles/(.*)$': '<rootDir>/src/styles/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^views/(.*)$': '<rootDir>/src/views/$1',
  },
  testEnvironment: 'jest-environment-jsdom-sixteen'
};
