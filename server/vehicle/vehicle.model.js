'use strict';

const { Model } = require('sequelize');
const { restoreOrCreate } = require('../common/database/restore');

class Vehicle extends Model {
  static fields({ DATE, INTEGER, STRING }) {
    return {
      oid: {
        type: STRING,
        unique: true
      },
      make: {
        type: STRING
      },
      model: {
        type: STRING
      },
      year: {
        type: INTEGER
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
      }
    };
  }

  static options() {
    return {
      modelName: 'vehicle',
      tableName: 'vehicle',
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    };
  }

  static async restoreOrCreate(vehicle, options) {
    return restoreOrCreate(this, vehicle, options);
  }
}

module.exports = Vehicle;
