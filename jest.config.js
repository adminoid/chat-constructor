module.exports = {

  verbose: true,

  globals: {
    "NODE_ENV": "test"
  },

  cache: false,

  testMatch: [
    '<rootDir>/(tests/vue/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],

  moduleFileExtensions: ["ts", "vue", "js"],

  moduleNameMapper: {
    "@r/(.*)$": "<rootDir>/resources/$1",
    "^vue$": "vue/dist/vue.common.js"
  },

  snapshotSerializers: ['jest-serializer-vue'],

  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  testEnvironment: 'jest-environment-jsdom',

  preset: 'ts-jest/presets/js-with-babel'

};
