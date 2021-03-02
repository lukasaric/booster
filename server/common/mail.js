'use strict';

const formData = require('form-data');
const { mail } = require('../config');
const Mailgun = require('mailgun.js');
const { origin } = require('./origin');
const mailgun = new Mailgun(formData);
const urlJoin = require('url-join');

const resetUrl = token => urlJoin(origin, '/#/reset-password/', token);

module.exports = { resetPassword };

const mg = mailgun.client(mail);

async function resetPassword(user, token) {
  const href = resetUrl(token);
  const body = {
    from: 'Booster',
    to: [user.email],
    subject: 'Reset password',
    text: 'Click link below to reset password',
    html: `<a>${href}</a>`
  };
  return mg.messages.create({ domain: mail.username }, body)
    .then(msg => console.log(JSON.parse(msg)))
    .catch(err => console.log(err));
}
