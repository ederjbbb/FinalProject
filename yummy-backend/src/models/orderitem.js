'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.DECIMAL(10, 2),
    mealId: DataTypes.INTEGER
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, { as: 'order'});
    OrderItem.belongsTo(models.Meal, {as: 'meal', foreignKey: {name: 'mealId', allowNull: false}});
  };
  return OrderItem;
};