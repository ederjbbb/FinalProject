const HttpStatus = require('http-status-codes');
const { User, AuthToken, SMS } = require('../models');
const createGenericController = require('./genericController');
const { NotFound, Unauthorized, BadRequest } = require('../constants/httpErrors');
const bcrypt = require('bcryptjs');
const awsService = require('../services/awsService');

const getDetailsFromRequest = (req, type = 'Login') => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'];
  return `IP:${ip}; UA:${ua}; Type:${type}`;
}

const authController = {
  login(req, res, next) {
    const { email } = req.body;
    let user;

    User
      .findOne({ where: { email } })
      .then(result => {
        if (!result)
          throw NotFound;

        user = result;
        return bcrypt.compare(req.body.password, result.dataValues.password);
      })
      .then(match => {
        if (!match)
          throw Unauthorized;

        const details = getDetailsFromRequest(req);
        const tokens = user.generateTokens(details);
        res.status(HttpStatus.OK).send({ ...tokens, user });
      })
      .catch(next);
  },

  logout(req, res, next) {
    const { userId, token } = req.auth;

    const authQuery = {
      where: {
        userId,
        token,
        active: true
      }
    };

    AuthToken
      .update({ active: false }, authQuery)
      .then(result => res.status(HttpStatus.OK).send({ result }))
      .catch(next);
  },

  logoutAll(req, res, next) {
    const { userId } = req.auth;

    AuthToken.update({ active: false }, {
      where: {
        userId,
        active: true
      }
    }).then(result => res.status(HttpStatus.OK).send({ result }))
      .catch(next);
  },

  renew(req, res, next) {
    const { body: { renew }, auth: { userId } } = req;

    // If we have a valid renew token then try to find the user
    const findUser = result => result[0] == 1 ? User.findByPk(userId) : undefined;

    const whereFilter = {
      where: {
        userId,
        renew,
        active: true
      }
    };

    AuthToken
      .update({ active: false }, whereFilter)
      .then(findUser)
      .then(user => {
        if (!user)
          throw NotFound;

        const details = getDetailsFromRequest(req, 'Renew');
        const tokens = user.generateTokens(details);
        res.status(HttpStatus.OK).send({ ...tokens, user });
      })
      .catch(next);
  },

  sendSMS(req, res, next) {
    const { phone } = req.body;
    const code = ('' + Math.random()).substring(2, 6);

    User
      .findAll({ where: { phone } })
      .then(users => {
        if (users.length > 0 || !phone)
          throw BadRequest;

        return awsService.sendSMS(phone, `Yummy: ${code}`);
      })
      .then(() => {
        return SMS.create({
          phone,
          code
        });
      })
      .then(() => {
        res.status(HttpStatus.OK).send({ result: 'Ok' });
      })
      .catch(next);
  },

  validateSMS(req, res, next) {
    const { phone, code } = req.body;
    const smsQuery = {
      where: {
        phone
      },
      order: [
        ['id', 'DESC']
      ]
    };

    SMS
      .findAll(smsQuery)
      .then(result => {
        const sms = result[0]
        if (!sms || sms.code !== code)
          throw BadRequest

        return sms.update({ validated: true });
      })
      .then(() => res.status(HttpStatus.OK).send({ result: 'Ok' }))
      .catch(next);
  }
}

module.exports = authController;