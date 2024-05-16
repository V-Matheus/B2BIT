module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.svg$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
};