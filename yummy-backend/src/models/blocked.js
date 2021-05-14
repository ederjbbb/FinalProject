'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blocked = sequelize.define('Blocked', {
    merchantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notNull: true, 
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notNull: true, 
      }
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
        notEmpty: true
      }
    }
  }, {});
  Blocked.associate = function(models) {
    // associations can be defined here
  };
  Blocked.removeAttribute('id');
  return Blocked;
};