'use strict';

const TABLE_NAME = 'vehicle';

module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable(TABLE_NAME, getColumns(Sequelize));
    return addConstraints(qi);
  },
  down: qi => qi.dropTable(TABLE_NAME)
};

const getColumns = ({ DATE, INTEGER, STRING }) => ({
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

function addConstraints(qi) {
  const fields = ['make', 'model', 'year'];
  const options = { type: 'unique', name: 'vehicle_idx', fields };
  return qi.addConstraint(TABLE_NAME, options);
}
