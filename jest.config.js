module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFiles: ['<rootDir>/test/setupJest.js']
};