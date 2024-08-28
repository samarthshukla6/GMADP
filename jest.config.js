const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
      },
      extensionsToTreatAsEsm: [".ts"],
      testMatch: ['**/test/**/*.+(ts|tsx|js)'],
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    
    
}

module.exports = createJestConfig(config)