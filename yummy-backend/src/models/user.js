'use strict';
const { BadRequestWithMsg } = require('../constants/httpErrors');
const { JWT_KEY } = require('../constants/environment');
const roles = require('../constants/roles');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const randonToken = require('rand-token');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      alidate: {
        notEmpty: true,
        notNull: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      lowercase: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [Object.values(roles)],
        notEmpty: true,
        notNull: true,
      }
    }
  }, {
    hooks: {
      beforeSave: async (instance, options) => {
        if (instance._changed.password)
          instance.dataValues.password = await bcrypt.hash(instance.dataValues.password, saltRounds);
      }
    },
    getterMethods: {
      password() {
        return undefined;
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.AuthToken, {as: 'tokens', foreignKey: 'userId'});
  };

  User.prototype.generateTokens = function (details = '') {
    const token = jwt.sign({
      _id: this.id,
      _role: this.role
    }, JWT_KEY, { expiresIn: '7d' });
    const renew = randonToken.uid(255);
    this.createToken({token, renew, details, active: true})

    return {
      token,
      renew
    };
  }

  return User;
};
