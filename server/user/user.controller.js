'use strict';

const Audience = require('../common/auth/audience');
const { createError } = require('../common/errors');
const HttpStatus = require('http-status');
const pick = require('lodash/pick');
const { User } = require('../common/database');

const { CONFLICT, CREATED } = HttpStatus;

const inputAttrs = ['email', 'firstName', 'lastName'];

async function register({ body }, res) {
  const where = { email: body.email };
  const foundUser = User.findOne({ where });
  if (foundUser) return createError(CONFLICT, 'User already exists!');
  const payload = { ...pick(body, inputAttrs), role: body.role || 'USER' };
  const user = await User.create(payload);
  if (user) res.sendStatus(CREATED);
}

function login({ user }, res) {
  const token = user.createToken({
    expiresIn: '5 days',
    audience: Audience.Scope.Access
  });
  res.jsend.success({ token, user: user.profile });
}

function logout(req, res) {
  req.logout();
  return res.end();
}

module.exports = {
  register,
  login,
  logout
};
