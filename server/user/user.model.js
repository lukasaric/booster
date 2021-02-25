'use strict';

const bcrypt = require('bcrypt');
const compact = require('lodash/compact');
const config = require('../config');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const pick = require('lodash/pick');
const { Role } = require('../../common/config');

const PROFILE_ATTRS = [
  'id', 'role', 'email', 'firstName', 'lastName', 'fullName', 'createdAt', 'deletedAt'
];

class User extends Model {
  static fields({ DATE, ENUM, STRING, VIRTUAL }) {
    return {
      email: {
        type: STRING,
        allowNull: false,
        validate: { isEmail: true, notEmpty: true },
        unique: { msg: 'This email address is already in use.' }
      },
      password: {
        type: STRING,
        validate: { notEmpty: true, len: [5, 255] }
      },
      token: {
        type: STRING,
        validate: { notEmpty: true, len: [10, 500] }
      },
      role: {
        type: ENUM(Object.values(Role)),
        allowNull: false,
        defaultValue: Role.USER
      },
      firstName: {
        type: STRING,
        field: 'first_name'
      },
      lastName: {
        type: STRING,
        field: 'last_name'
      },
      fullName: {
        type: VIRTUAL,
        get() {
          return compact([this.firstName, this.lastName]).join(' ') || null;
        }
      },
      createdAt: {
        type: DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: DATE,
        field: 'deleted_at'
      },
      profile: {
        type: VIRTUAL,
        get() {
          return pick(this, PROFILE_ATTRS);
        }
      }
    };
  }

  static associate() {

  }

  static options() {
    return {
      modelName: 'user',
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    };
  }

  static hooks() {
    return {
      beforeCreate: user => user.encryptPassword()
    };
  }

  async encryptPassword() {
    if (!this.password) return;
    this.password = await bcrypt.hash(this.password, config.auth.saltRounds);
    return this;
  }

  async authenticate(password) {
    const result = await bcrypt.compare(password, this.password);
    return result && this;
  }

  createToken(options = {}) {
    const payload = pick(this, ['id', 'email']);
    return jwt.sign(payload, config.auth.secret, options);
  }
}

module.exports = User;
