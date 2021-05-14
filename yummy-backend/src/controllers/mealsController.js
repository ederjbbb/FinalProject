const HttpStatus = require('http-status-codes');
const { Meal, Restaurant } = require('../models');
const createGenericController = require('./genericController');
const validateOwner = true;
const roles = require('../constants/roles');
const { NotFound } = require('../constants/httpErrors');

const genericController = createGenericController(Meal, validateOwner);

const mealController = {

  ...genericController,

  list(req, res, next) {
    const { restaurantId } = req.params;
    const query = {
      where: {
        id: restaurantId
      }
    };

    if (req.auth.userRole === roles.MERCHANT)
      query['where'] = {  userId: req.auth.userId };

    Restaurant
      .findAll(query)
      .then(restaurants => {
        if (restaurants.length === 0)
          return;

        return Meal.findAll({
          where: { restaurantId }
        });
      })
      .then(meals =>
        meals ? res.status(HttpStatus.OK).send(meals) : next(NotFound)
      )
      .catch(next);
  },

  add(req, res, next) {
    req.body.restaurantId = req.params.restaurantId;
    genericController.add(req, res, next);
  },

}

module.exports = mealController;