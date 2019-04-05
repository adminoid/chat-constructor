module.exports = {

  testMatch: [
    '<rootDir>/(tests/vue/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],

  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', "ts", "tsx"],

  moduleNameMapper: {
    "@r/(.*)$": "<rootDir>/resources/$1",
    "^vue$": "vue/dist/vue.common.js"
  },

  snapshotSerializers: ['jest-serializer-vue'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

};
