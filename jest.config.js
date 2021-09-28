module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  snapshotSerializers: ['jest-serializer-vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    // 'src/components/**/*.vue',
    // 'src/views/**/*.vue'
    'src/components/BackToTop/index.vue'
  ]
}

