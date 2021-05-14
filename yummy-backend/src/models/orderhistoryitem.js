'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderHistoryItem = sequelize.define('OrderHistoryItem', {
    orderId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  OrderHistoryItem.associate = function(models) {
    // associations can be defined here
  };
  return OrderHistoryItem;
};