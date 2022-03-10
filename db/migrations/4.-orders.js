'use strict';

const { ORDER_TABLE } = require('../models/order.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        References: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
