module.exports = {

  testMatch: [
    '<rootDir>/(tests/vue/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', "ts", "tsx"],

  moduleNameMapper: {
    '^@customer/(.*)$': '<rootDir>/resources/customer/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

};
