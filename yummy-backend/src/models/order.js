'use strict';

const orderStatus = require('../constants/orderStatus');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    delivery: DataTypes.DECIMAL(10, 2),
    total: DataTypes.DECIMAL(10, 2),
    address:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true, 
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: orderStatus.OPEN
    }
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Restaurant, { as: 'restaurant' });
    Order.belongsTo(models.User, { as: 'user' });
    Order.hasMany(models.OrderItem, {as: 'items', foreignKey: {name: 'orderId', allowNull: false}, onDelete: 'CASCADE', individualHooks: true, hooks: true });
    Order.hasMany(models.OrderHistoryItem, {as: 'history', foreignKey: {name: 'orderId', allowNull: false}, onDelete: 'CASCADE', individualHooks: true, hooks: true });
  };
  return Order;
};