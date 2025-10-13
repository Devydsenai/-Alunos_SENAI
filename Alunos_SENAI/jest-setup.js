// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock Expo modules
jest.mock('expo-image-picker', () => ({
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    Ionicons: ({ name, ...props }) => React.createElement('Icon', { ...props, testID: `icon-${name}` }),
  };
});

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: ({ children, ...props }) => {
    const React = require('react');
    return React.createElement('View', props, children);
  },
  Stack: {
    Screen: () => null,
  },
  Tabs: ({ children }) => {
    const React = require('react');
    return React.createElement('View', {}, children);
  },
}));

// Silence console errors during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

