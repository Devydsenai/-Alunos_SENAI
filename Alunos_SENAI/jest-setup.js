// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock Expo Winter runtime
jest.mock('expo/src/winter/runtime.native', () => ({}), { virtual: true });
jest.mock('expo/src/winter/installGlobal', () => ({}), { virtual: true });

// Mock global fetch if not available
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Mock __ExpoImportMetaRegistry
if (typeof global.__ExpoImportMetaRegistry === 'undefined') {
  global.__ExpoImportMetaRegistry = {
    register: jest.fn(),
    get: jest.fn(),
  };
}

// Polyfill structuredClone if not available
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

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

// Mock expo constants and other modules
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {},
  },
}));

// Mock expo-asset
jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn(() => ({ uri: 'mocked-asset-uri' })),
    loadAsync: jest.fn(),
  },
}));

// Mock expo modules that might be imported
jest.mock('expo', () => ({
  registerRootComponent: jest.fn(),
}));

// Silence console errors during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};


