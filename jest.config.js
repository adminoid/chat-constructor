module.exports = {
  testRegex: 'tests/vue/components/.*.spec.js$'
};

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@customer/(.*)$': '<rootDir>/resources/customer/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/(tests/vue/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(babel-jest|jest-vue-preprocessor)/)"
  ]
};
