const HttpStatus = require('http-status-codes');
const { Restaurant, Blocked } = require('../models');
const createGenericController = require('./genericController');
const validateOwner = true;
const roles = require('../constants/roles');
const { Op } = require("sequelize");

const genericRestaurantController = createGenericController(Restaurant, validateOwner);

const restaurantController = {

  ...genericRestaurantController,

  list(req, res, next) {
    const query = {
      order: [
        ['id', 'ASC']
      ],
    };
    const bloquedQuery = {
      attributes: ['merchantId']
    };

    const isAuthenticated = req.auth && req.auth.userId;

    if (isAuthenticated)
      bloquedQuery.where = { customerId: req.auth.userId };

    Blocked
      .findAll(bloquedQuery)
      .then((result) => {
        const merchantsWhereUserIsBlocked = result.map(blocked => blocked.merchantId);
        if (isAuthenticated) {
          if (req.auth.userRole === roles.MERCHANT) // just return his/her own restaurants
            query['where'] = { userId: req.auth.userId };
          else // only return restaurants where the user is not blocked
            query['where'] = { userId: { [Op.notIn]: merchantsWhereUserIsBlocked } };
        }
      })
      .then(() => Restaurant.findAll(query))
      .then(entities => res.status(HttpStatus.OK).send(entities))
      .catch(next);
  },

  listPublic(req, res, next) {
    genericRestaurantController.list(req, res, next);
  }
}

module.exports = restaurantController;