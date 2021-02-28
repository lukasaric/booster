'use strict';

const { Model } = require('sequelize');

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
      tableName: 'vehicle',
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    };
  }

  static async restoreOrCreate({ id, ...payload }) {
    if (id) {
      const vehicle = await Vehicle.findByPk(id, { paranoid: false });
      if (vehicle.deletedAt) vehicle.setDataValue('deletedAt', null);
      return vehicle.save();
    }
    const found = await Vehicle.findOne({ where: payload });
    return found || Vehicle.create(payload);
  }
}

module.exports = Vehicle;
