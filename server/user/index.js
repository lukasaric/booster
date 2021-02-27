'use strict';

const auth = require('../common/auth');
const ctrl = require('./user.controller');
const router = require('express').Router();

router
  .post('/register', ctrl.register)
  .post('/login', auth.authenticate('local'), ctrl.login)
  .use(auth.authenticate('jwt'))
  .post('/logout', ctrl.logout)
  .get('/', ctrl.list);

module.exports = {
  path: '/users',
  router
};
