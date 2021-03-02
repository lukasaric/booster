'use strict';

const Audience = require('../common/auth/audience');
const { createError } = require('../common/errors');
const HttpStatus = require('http-status');
const pick = require('lodash/pick');
const { User } = require('../common/database');

const { CONFLICT, CREATED, NO_CONTENT, NOT_FOUND } = HttpStatus;

const inputAttrs = ['email', 'firstName', 'lastName', 'password'];

async function register({ body }, res) {
  const where = { email: body.email };
  const foundUser = await User.findOne({ where });
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

function logout(_, res) {
  return res.end();
}

async function forgotPassword({ body }, res) {
  const where = { email: body.email };
  const user = await User.findOne({ where });
  if (!user) return createError(NOT_FOUND, 'User not found');
  user.sendResetToken();
  return res.end();
}

async function resetPassword({ body, user }, res) {
  await user.update({ password: body.password });
  res.sendStatus(NO_CONTENT);
}

async function count({ query: { email } }, res) {
  const where = {};
  if (email) where.email = email;
  return res.jsend.success({ total: await User.count({ where }) });
}

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  count
};
