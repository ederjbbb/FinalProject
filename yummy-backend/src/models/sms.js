'use strict';
module.exports = (sequelize, DataTypes) => {
  const SMS = sequelize.define('SMS', {
    code: DataTypes.STRING,
    phone: DataTypes.STRING,
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  SMS.associate = function(models) {
    // associations can be defined here
  };
  return SMS;
};