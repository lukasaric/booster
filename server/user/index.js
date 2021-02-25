'use strict';

const auth = require('../common/auth');
const ctrl = require('./user.controller');
const router = require('express').Router();

router
  .post('/login', auth.authenticate('local'), ctrl.login)
  .post('/register', ctrl.register);

router
  .use(auth.authenticate('jwt'))
  .post('/logout', ctrl.logout);

module.exports = {
  path: '/users',
  router
};
