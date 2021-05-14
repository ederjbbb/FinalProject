const { Unauthorized, Forbidden, NotFound, BadRequestWithMsg } = require('../constants/httpErrors');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../constants/environment');
const { AuthToken } = require('../models');
const roles = require('../constants/roles');

const createAuthMidleware = function (authorized) {
  const _authorizedRoles = authorized;

  return (req, res, next) => {
    const token = (req.header('Authorization') || '').replace('Bearer ', '');
    try {
      jwt.verify(token, JWT_KEY);
    } catch (e) {
      next(new Error('Invalid authorization token'))
      return;
    }
    const { _id: userId, _role: userRole } = jwt.verify(token, JWT_KEY);
    const tokenQuery = {
      where: {
        userId,
        token,
        active: true
      }
    };

    AuthToken
      .findAll(tokenQuery)
      .then(tokens => {
        if (tokens.length != 1)
          throw BadRequestWithMsg('Token not found');

        if (userRole !== roles.ADMIN && !_authorizedRoles.includes(userRole))
          throw Forbidden;

        req.auth = {
          userId,
          userRole,
          token
        };
        next();
      }).catch(next);
  }
}

module.exports = {
  // only merchants can access the endpoint
  authMerchant: createAuthMidleware([roles.MERCHANT]),
  // only customers can access the endpoint
  authCustomer: createAuthMidleware([roles.CUSTOMER]),
  // only admins can access the endpoint (not used by the website)
  authAdmin: createAuthMidleware([roles.ADMIN]),
  // anyone logged can access the endpoint
  auth: createAuthMidleware(Object.values(roles))
};