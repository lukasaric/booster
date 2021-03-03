'use strict';

const app = require('./app');
const database = require('./common/database');
const { port } = require('./common/origin');
const Promise = require('bluebird');
const { promisify } = require('util');
const logger = require('./common/logger')();

const isProduction = process.env.NODE_ENV === 'production';
Promise.config({ longStackTraces: !isProduction });

const runServer = promisify(app.listen.bind(app));

database.initialize()
  .then(() => runServer(port))
  .then(() => logger.info(`Server listening on port ${port}`))
  .catch(err => {
    logger.fatal(err, 'Starting server failed');
    process.exit(1);
  });
