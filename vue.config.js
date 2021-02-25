'use strict';

const config = require('./server/config');
const path = require('path');

module.exports = {
  transpileDependencies: ['vuetify'],
  outputDir: path.resolve(__dirname, './dist'),
  devServer: {
    // Override using: `npm run dev:client -- --port <number>`
    port: 8081,
    proxy: {
      '/api': {
        target: `http://${config.ip}:${config.port}`
      }
    }
  },
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./client/main.js')
      .end();
    config.resolve.alias
      .set('@', path.join(__dirname, './client'));
  }
};
