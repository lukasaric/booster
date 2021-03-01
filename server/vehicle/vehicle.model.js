'use strict';

const { Model } = require('sequelize');
const Promise = require('bluebird');

const pTuple = fn => Promise.try(fn).then(result => [null, result], err => [err]);

class Vehicle extends Model {
  static fields({ DATE, INTEGER, STRING }) {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    };
  }

  static async restoreOrCreate({ id, ...payload }) {
    return pTuple(() => id ? this.restore(id) : Vehicle.create(payload));
  }

  static async restore(id) {
    const vehicle = await Vehicle.findByPk(id, { paranoid: false });
    if (vehicle.deletedAt) vehicle.setDataValue('deletedAt', null);
    return vehicle.save();
  }
}

module.exports = Vehicle;
