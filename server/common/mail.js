'use strict';

const { mail } = require('../config');
const { origin } = require('./origin');
const urlJoin = require('url-join');

const options = { apiKey: mail.key, domain: mail.domain };
const mailgun = require('mailgun-js')(options);

const resetUrl = token => urlJoin(origin, '/#/reset-password/', token);

module.exports = { resetPassword };

async function resetPassword(user, token) {
  const href = resetUrl(token);
  const body = {
    from: mail.sender,
    to: user.email,
    subject: 'Reset password',
    text: 'Click link below to reset password',
    html: `<a>${href}</a>`
  };
  return mailgun.messages().send(body, (_, body) => console.log(body));
}
