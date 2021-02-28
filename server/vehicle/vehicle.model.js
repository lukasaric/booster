'use strict';

const { Model } = require('sequelize');
const Promise = require('bluebird');
const { UniqueConstraintError } = require('sequelize');

const pTuple = fn => Promise.try(fn).then(result => [null, result], err => [err]);

class Vehicle extends Model {
  static fields({ DATE, INTEGER, STRING }) {
    return {
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
    return pTuple(async () => {
      if (id) {
        const vehicle = await Vehicle.findByPk(id, { paranoid: false });
        if (vehicle.deletedAt) vehicle.setDataValue('deletedAt', null);
        return vehicle.save();
      }
      const found = await Vehicle.findOne({ where: payload });
      if (!found) return Vehicle.create(payload);
      const message = 'Vehicle already exists';
      throw new UniqueConstraintError({ message });
    });
  }
}

module.exports = Vehicle;
