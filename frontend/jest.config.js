module.exports = {
  preset: 'react-native',
  // Add this section:
  moduleNameMapper: {
    '^react-native-vector-icons/(.*)$': '<rootDir>/__mocks__/react-native-vector-icons.js',
  },
};