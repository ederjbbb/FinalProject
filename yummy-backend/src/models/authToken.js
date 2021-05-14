'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    renew: DataTypes.STRING,
    details: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  AuthToken.associate = function(models) {
    // associations can be defined here
  };
  return AuthToken;
};