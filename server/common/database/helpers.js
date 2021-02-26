'use strict';

const inRange = require('lodash/inRange');
const { Sequelize } = require('sequelize');

const isFunction = arg => typeof arg === 'function';
const notEmpty = input => input.length > 0;

module.exports = {
  getValidator,
  wrapMethods
};

function getValidator(Model, attribute) {
  return function validate(input) {
    const validator = Model.prototype.validators[attribute];
    if (!validator || !validator.len) {
      return notEmpty(input) || `"${attribute}" can not be empty`;
    }
    const [min, max] = validator.len;
    return inRange(input.length, min, max) ||
      `"${attribute}" must be between ${min} and ${max} characters long`;
  };
}

function wrapMethods(Model, Promise) {
  let Ctor = Model;
  do {
    const methods = getMethods(Ctor.prototype);
    const staticMethods = getMethods(Ctor);
    [...methods, ...staticMethods].forEach(method => wrapMethod(method, Promise));
    Ctor = Object.getPrototypeOf(Ctor);
  } while (Ctor !== Sequelize.Model && Ctor !== Function.prototype);
  return Model;
}

function wrapMethod({ key, value, target }, Promise) {
  target[key] = function () {
    const result = value.apply(this, arguments);
    if (!result || !isFunction(result.catch)) return result;
    return Promise.resolve(result);
  };
}

function getMethods(object) {
  return getProperties(object)
    .filter(({ key, value }) => isFunction(value) && key !== 'constructor');
}

function getProperties(object) {
  return Reflect.ownKeys(object).map(key => {
    const { value } = Reflect.getOwnPropertyDescriptor(object, key);
    return { key, value, target: object };
  });
}
