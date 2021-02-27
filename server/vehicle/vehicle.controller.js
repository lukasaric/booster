'use strict';

const { CONFLICT, NO_CONTENT } = require('http-status');
const { Sequelize, Vehicle } = require('../common/database');
const { createError } = require('../common/errors');
const pick = require('lodash/pick');

const { Op, fn, col, literal } = Sequelize;

const inputAttrs = ['id', 'make', 'model', 'year'];

function createFuzzySearch(where, options, search) {
  search = search.toUpperCase();
  const make = Sequelize.where(fn('levenshtein', col('make'), search), '<=', 5);
  const order = [literal([`levenshtein('${search}', make)`])];
  where[Op.and].push(make);
  options.order = order;
}

async function list({ query, options }, res) {
  const { fuzzyResult, search } = query;
  const where = { [Op.and]: [] };
  if (search) createFuzzySearch(where, options, search);
  if (fuzzyResult) where[Op.and].push({ make: JSON.parse(fuzzyResult).make });
  const { rows, count } = await Vehicle.findAndCountAll({ ...options, where });
  return res.jsend.success({ items: rows, total: count });
}

async function create({ body }, res) {
  const payload = pick(body, inputAttrs);
  const vehicle = await Vehicle.restoreOrCreate(payload);
  if (vehicle) return createError(CONFLICT, 'Vehicle already exists!');
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
