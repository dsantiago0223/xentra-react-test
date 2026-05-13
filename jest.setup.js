import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Async Storage
jest.mock(
  '@react-native-async-storage/async-storage',
  () => mockAsyncStorage,
);

// React Native Config
jest.mock('react-native-config', () => ({
  API_URL: 'https://mock-api.com',
}));

// React Native Screens
jest.mock('react-native-screens', () => ({
  ...jest.requireActual('react-native-screens'),
  enableScreens: jest.fn(),
}));

// Vector Icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// Bootsplash
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));