'use strict';

require('express-async-errors');
const auth = require('./common/auth').authenticate('jwt');
const express = require('express');
const get = require('lodash/get');
const { Sequelize } = require('./common/database');
const user = require('./user');
const vehicle = require('./vehicle');
const yn = require('yn');

const router = express.Router();

// Public routes:
router.use('/', parseOptions);
router.use(user.path, user.router);

// Protected routes:
router.use(auth);
router.use(vehicle.path, vehicle.router);

module.exports = router;

function parseOptions(req, _, next) {
  let sortBy = get(req.query, 'sortBy', 'id');
  if (sortBy.includes('.')) sortBy = Sequelize.literal(sortBy);
  const paranoidKeywords = ['archived', 'deleted', 'destroyed'];
  const paranoid = !paranoidKeywords.some(it => yn(req.query[it]));
  req.options = {
    limit: parseInt(req.query.limit, 10) || 100,
    offset: parseInt(req.query.offset, 10) || 0,
    order: [[sortBy, req.query.sortOrder || 'ASC']],
    paranoid
  };
  next();
}
