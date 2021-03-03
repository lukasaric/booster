'use strict';

const { createLogger, Level } = require('./logger');
const { mail } = require('../config');
const { origin } = require('./origin');
const urlJoin = require('url-join');

const options = { apiKey: mail.key, domain: mail.domain };
const mailgun = require('mailgun-js')(options);

const resetUrl = token => urlJoin(origin, '/#/auth/reset-password/', token);

const logger = createLogger('mailer', { level: Level.DEBUG });

module.exports = { resetPassword };

function resetPassword(user, token) {
  const href = resetUrl(token);
  const body = {
    from: mail.sender,
    to: user.email,
    subject: 'Reset password',
    html: `<div>
      <p>Click link below to reset password:</p>
      <br>
      <a href="${href}" target="_blank" rel="noopener">Reset password link</a
    </div>`
  };
  return mailgun.messages().send(body, (_, body) => logger.info(body));
}
