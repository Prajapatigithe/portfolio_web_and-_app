module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|react-native-screens|react-native-gesture-handler|@react-navigation|@react-native-async-storage)/)',
  ],
};
