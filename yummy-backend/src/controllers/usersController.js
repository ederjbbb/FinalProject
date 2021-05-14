const HttpStatus = require('http-status-codes');
const { User, Blocked, SMS } = require('../models');
const createGenericController = require('./genericController');
const { NotFound, BadRequest } = require('../constants/httpErrors');
const createBuildEntityFrom = require('../services/createBuildEntity');
const roles = require('../constants/roles');

const userController = {
  ...createGenericController(User),

  getByEmail(req, res, next) {
    User
      .findAll({ where: { email: req.params.email } })
      .then(result => result.length !== 0 ? res.status(HttpStatus.OK).send(result[0]) : next(NotFound))
      .catch(next);
  },

  getByTokenId(req, res, next) {
    User
      .findByPk(req.auth.userId)
      .then(entity =>
        entity ? res.status(HttpStatus.OK).send(entity) : next(NotFound)
      )
      .catch(next);
  },

  add(req, res, next) {
    const buildEntity = createBuildEntityFrom(User);
    
    const smsQuery = { 
      where: { 
        phone: req.body.phone,
        validated: true
      }
    }

    SMS
      .findOne(smsQuery)
      .then(sms => {
        if (!sms)
          throw BadRequest;
        return User.create(buildEntity(req.body));
      })
      .then(entity => {
        const tokens = entity.generateTokens();
        res.status(HttpStatus.CREATED).send({ ...tokens, user: entity });
      })
      .catch(next);
  },

  block(req, res, next) {
    const { customerId } = req.params;
    const { reason } = req.body;
    const { userId: merchantId } = req.auth;

    if (customerId == merchantId) {
      next(BadRequest);
      return;
    }

    const blockEntity = {
      customerId,
      merchantId,
      reason
    };

    User
      .findByPk(customerId)
      .then(user => {
        if (!user && user.role !== roles.CUSTOMER)
          throw NotFound
        return Blocked.create(blockEntity);
      })
      .then(() => res.status(HttpStatus.CREATED).send({ status: 'Ok' }))
      .catch(next);
  },

  unblock(req, res, next) {
    const { customerId } = req.params;
    const { userId: merchantId } = req.auth;
    const query = { 
      where: {
        customerId,
        merchantId
      }
    };

    Blocked
      .destroy(query)
      .then((result) => res.status(HttpStatus.CREATED).send({ status: 'Ok' }))
      .catch(next);
  }
}

module.exports = userController;