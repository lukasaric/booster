'use strict';

const { CONFLICT, NO_CONTENT } = require('http-status');
const { Sequelize, Vehicle } = require('../common/database');
const { createError } = require('../common/errors');
const pick = require('lodash/pick');

const { Op, fn, col, literal, cast } = Sequelize;

const inputAttrs = ['id', 'make', 'model', 'year'];

const processFuzzyOrder = search => ['make', 'model', 'year'].map(col => {
  return literal([`levenshtein('${search}', cast(${col} as VARCHAR))`]);
});

function createFuzzySearch(where, options, search) {
  search = search.toUpperCase();
  const yearColumn = cast(col('year'), 'varchar');
  const concat = fn('concat', col('make'), col('model'), yearColumn);
  const whereCond = Sequelize.where(fn('levenshtein', concat, search), '<=', 10);
  where[Op.and].push(whereCond);
  options.order = processFuzzyOrder(search);
}

async function list({ query, options }, res) {
  const { vehicleId, search } = query;
  const where = { [Op.and]: [] };
  if (search) createFuzzySearch(where, options, search);
  if (vehicleId) where[Op.and].push({ id: vehicleId });
  const { rows, count } = await Vehicle.findAndCountAll({ ...options, where });
  return res.jsend.success({ items: rows, total: count });
}

async function create({ body }, res) {
  const payload = pick(body, inputAttrs);
  const [err, vehicle] = await Vehicle.restoreOrCreate(payload);
  if (err) return createError(CONFLICT, 'Vehicle already exists!');
  return res.jsend.success(vehicle);
}

async function remove({ vehicle }, res) {
  await vehicle.destroy();
  return res.sendStatus(NO_CONTENT);
}

module.exports = {
  list,
  create,
  remove
};
