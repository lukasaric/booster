'use strict';

const Logger = require('bunyan');
const pkg = require('../../package.json');

const noop = Function.prototype;

const Level = getLevels(Logger);
const loggers = {};

function createLogger(name, options = {}) {
  name = pkg.name + (name ? `:${name}` : '');
  const serializers = { ...Logger.stdSerializers, ...options.serializers };
  if (!loggers[name]) loggers[name] = new Logger({ ...options, name, serializers });
  return loggers[name];
}
const disable = () => (Logger.prototype.addStream = noop);
Object.assign(createLogger, Logger, { createLogger, disable, Level });

module.exports = createLogger;

function getLevels(Logger) {
  const { levelFromName: levels } = Logger;
  return Object.keys(levels).reduce((acc, name) => {
    return Object.assign(acc, { [name.toUpperCase()]: levels[name] });
  }, {});
}
