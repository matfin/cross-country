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
    'src/components/planner/connectedPlanner.tsx',
    'src/components/routes/connectedRoutes.tsx',
    'src/services/googlemaps.ts'
  ],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^styles/(.*)$': '<rootDir>/src/styles/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom-sixteen'
};
