'use strict';

const TABLE_NAME = 'vehicle';

module.exports = {
  up: (qi, Sequelize) => qi.createTable(TABLE_NAME, getColumns(Sequelize)),
  down: qi => qi.dropTable(TABLE_NAME)
};

const getColumns = ({ DATE, INTEGER, STRING }) => ({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
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
    field: 'created_at',
    allowNull: false
  },
  updatedAt: {
    type: DATE,
    field: 'updated_at',
    allowNull: false
  },
  deletedAt: {
    type: DATE,
    field: 'deleted_at'
  }
});
