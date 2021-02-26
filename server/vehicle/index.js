'use strict';

const { createError } = require('../common/errors');
const ctrl = require('./vehicle.controller');
const { NOT_FOUND } = require('http-status');
const { Vehicle } = require('../common/database');
const router = require('express').Router();

router
  .param('vehicleId', getVehicle)
  .delete('/:vehicleId', ctrl.remove);

router
  .get('/', ctrl.list)
  .post('/', ctrl.create);

async function getVehicle(req, _, next, vehicleId) {
  const vehicle = await Vehicle.findByPk(vehicleId);
  if (!vehicle) return createError(NOT_FOUND, 'Not found!');
  req.vehicle = vehicle;
  next();
}

module.exports = {
  path: '/vehicles',
  router
};
