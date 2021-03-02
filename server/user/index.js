'use strict';

const { authenticate } = require('../common/auth');
const ctrl = require('./user.controller');
const router = require('express').Router();

router
  .post('/register', ctrl.register)
  .get('/', ctrl.count)
  .post('/forgot-password', ctrl.forgotPassword)
  .post('/reset-password', authenticate('token'), ctrl.resetPassword)
  .post('/login', authenticate('local'), ctrl.login);

router.use(authenticate('jwt'))
  .post('/logout', ctrl.logout);

module.exports = {
  path: '/users',
  router
};
