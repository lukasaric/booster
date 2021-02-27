'use strict';

const Audience = require('../common/auth/audience');
const { createError } = require('../common/errors');
const HttpStatus = require('http-status');
const pick = require('lodash/pick');
const { User } = require('../common/database');

const { CONFLICT, CREATED } = HttpStatus;

const inputAttrs = ['email', 'firstName', 'lastName', 'password'];

async function list({ query: { email }, options }, res) {
  const where = {};
  if (email) where.email = email;
  const { count } = await User.findAndCountAll({ where, ...options });
  return res.jsend.success({ total: count });
}

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

module.exports = {
  list,
  register,
  login,
  logout
};
