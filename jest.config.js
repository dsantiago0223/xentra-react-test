module.exports = {
  preset: 'react-native',

  setupFiles: ['./jest.setup.js'],

  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|react-native-paper|react-native-safe-area-context|react-native-screens|react-native-keyboard-aware-scroll-view|react-native-iphone-x-helper)/)',
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],

  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
};