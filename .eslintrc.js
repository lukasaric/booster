'use strict';

module.exports = {
  root: true,
  extends: '@extensionengine',
  plugins: ['vuetify'],

  rules: {
    'vuetify/no-deprecated-classes': 'error'
  },

  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: { jest: true }
  }]
};
