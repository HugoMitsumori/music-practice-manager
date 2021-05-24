const ignorePattern = 'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'

const config = {
  preset: 'jest-expo',
  transformIgnorePatterns: [ignorePattern],
}

module.exports = config
