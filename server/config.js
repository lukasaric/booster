'use strict';

const path = require('path');

module.exports = {
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || process.env.SERVER_PORT || 5000,
  ip: process.env.IP,
  reverseProxyPort: process.env.REVERSE_PROXY_PORT,
  apiPath: process.env.API_PATH || '/api',
  staticFolder: path.resolve(__dirname, '../dist'),
  auth: {
    scheme: process.env.AUTH_JWT_SCHEME || 'JWT',
    secret: process.env.AUTH_JWT_SECRET,
    saltRounds: parseInt(process.env.AUTH_SALT_ROUNDS, 10),
    issuer: process.AUTH_JWT_ISSUER || 'booster'
  },
  mail: {
    sender: process.env.EMAIL_SENDER_NAME,
    domain: process.env.MAILGUN_DOMAIN,
    key: process.env.MAILGUN_API_KEY
  }
};
