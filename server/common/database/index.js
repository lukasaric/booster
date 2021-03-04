'use strict';

const config = require('./config');
const forEach = require('lodash/forEach');
const invoke = require('lodash/invoke');
const { migrationsPath } = require('../../../sequelize.config');
const pick = require('lodash/pick');
const pkg = require('../../../package.json');
const Promise = require('bluebird');
const result = require('lodash/result');
const semver = require('semver');
const Sequelize = require('sequelize');
const Umzug = require('umzug');
const logger = require('../logger')('db');

// Require models.
/* eslint-disable require-sort/require-sort */
const User = require('../../user/user.model');
const Vehicle = require('../../vehicle/vehicle.model');
/* eslint-enable require-sort/require-sort */

const { DATABASE_EXTENSION, NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
const sequelize = createConnection(config);
const { Sequelize: { DataTypes } } = sequelize;

const defineModel = Model => {
  const fields = invoke(Model, 'fields', DataTypes, sequelize) || {};
  const hooks = invoke(Model, 'hooks') || {};
  const options = invoke(Model, 'options') || {};
  return Model.init(fields, { sequelize, hooks, ...options });
};

function initialize() {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: config.migrationStorageTableName
    },
    migrations: {
      params: [sequelize.getQueryInterface(), Sequelize],
      path: migrationsPath
    },
    logging(message) {
      if (message.startsWith('==')) return;
      if (message.startsWith('File:')) {
        const file = message.split(/\s+/g)[1];
        return logger.info({ file }, message);
      }
      return logger.info(message);
    }
  });

  umzug.on('migrating', migration => logger.info({ migration }, 'Migrating:', migration));
  umzug.on('migrated', migration => logger.info({ migration }, 'Migrated:', migration));
  umzug.on('reverting', migration => logger.info({ migration }, 'Reverting:', migration));
  umzug.on('reverted', migration => logger.info({ migration }, 'Reverted:', migration));

  return sequelize.authenticate()
    .then(() => logger.info(getConfig(sequelize), 'Connected to database'))
    .then(() => checkPostgrePrerequisites(sequelize))
    .then(() => !isProduction && umzug.up())
    .then(() => umzug.executed())
    .then(migrations => {
      const files = migrations.map(it => it.file);
      if (!files.length) return;
      logger.info({ migrations: files }, 'Executed migrations:\n', files.join('\n'));
    });
}

const models = {
  User: defineModel(User),
  Vehicle: defineModel(Vehicle)
};

forEach(models, model => {
  addScopes(model, models);
  invoke(model, 'associate', models);
  invoke(model, 'addHooks', models);
});

const db = {
  Sequelize,
  sequelize,
  initialize,
  ...models
};

// Patch Sequelize#method to support getting models by class name.
sequelize.model = name => sequelize.models[name] || db[name];

module.exports = db;

function createConnection(config) {
  if (!config.url) return new Sequelize(config);
  return new Sequelize(config.url, config);
}

function getConfig(sequelize) {
  // NOTE: List public fields: https://git.io/fxVG2
  return pick(sequelize.config, [
    'database', 'username', 'host', 'port', 'protocol',
    'pool',
    'native',
    'ssl',
    'replication',
    'dialectModulePath',
    'keepDefaultTimezone',
    'dialectOptions'
  ]);
}

async function checkPostgrePrerequisites(sequelize) {
  await processPostgreExtensions(sequelize);
  const type = sequelize.QueryTypes.VERSION;
  const version = await sequelize.query('SHOW server_version', { type });
  logger.info({ version }, 'PostgreSQL version:', version);
  const range = pkg.engines && pkg.engines.postgres;
  if (!range) return;
  if (semver.satisfies(semver.coerce(version), range)) return;
  const err = new Error(`"${pkg.name}" requires PostgreSQL ${range}`);
  logger.error({ version, required: range }, err.message);
  return Promise.reject(err);
}

async function processPostgreExtensions(sequelize) {
  const [extensions] = await sequelize.query('SELECT * FROM pg_extension', { raw: true });
  const extensionExists = extensions.some(it => it.extname === DATABASE_EXTENSION);
  if (extensionExists) return;
  return sequelize.query(`CREATE EXTENSION ${DATABASE_EXTENSION};`);
}

function addScopes(Model, models) {
  const scopes = invoke(Model, 'scopes', models);
  forEach(scopes, (scope, name) => {
    if (name === 'defaultScope') scope = result(scopes, 'defaultScope');
    Model.addScope(name, scope, { override: true });
  });
}
