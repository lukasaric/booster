'use strict';

const path = require('path');

module.exports = {
  hostname: process.env.HOSTNAME,
  port: process.env.SERVER_PORT,
  ip: process.env.IP,
  apiPath: process.env.API_PATH || '/api',
  staticFolder: path.resolve(__dirname, '../dist'),
  auth: {
    scheme: process.env.AUTH_JWT_SCHEME || 'JWT',
    secret: process.env.AUTH_JWT_SECRET,
    saltRounds: parseInt(process.env.AUTH_SALT_ROUNDS, 10),
    issuer: process.AUTH_JWT_ISSUER || 'booster'
  },
  mail: {
    username: process.env.MAILGUN_USERNAME,
    key: process.env.MAILGUN_API_KEY,
    url: process.env.MAILGUN_URL
  }
};
