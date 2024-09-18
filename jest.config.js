const nextJest = require('next/jest')

// Next.js 에게 경로를 제공
const createJestConfig = nextJest({ dir: './' })

// jest 에서 설정하고 싶은 옵션을 여기서 작성하면 된다.
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
