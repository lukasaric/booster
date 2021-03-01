'use strict';

module.exports = {
  root: true,
  extends: '@extensionengine',
  plugins: ['vuetify', 'jest'],
  rules: { 'vuetify/no-deprecated-classes': 'error' },
  overrides: [{
    files: ['extensions/**'],
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
    }
  }, {
    files: ['tests/**'],
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
    },
    env: { jest: true }
  }]
};
