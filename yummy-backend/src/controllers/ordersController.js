const HttpStatus = require('http-status-codes');
const { Order, Blocked, Restaurant, OrderItem, Meal, User, OrderHistoryItem } = require('../models');
const createGenericController = require('./genericController');
const roles = require('../constants/roles');
const { Op } = require("sequelize");
const { BadRequest, BadRequestWithMsg, NotFound } = require('../constants/httpErrors');
const orderStatus = require('../constants/orderStatus');
const statusChangeService = require('../services/statusChangeService');

const orderDetails = [
  { model: Restaurant, as: 'restaurant' },
  { model: User, as: 'user' },
  { model: OrderItem, as: 'items', include: [{ model: Meal, as: 'meal' }] },
  { model: OrderHistoryItem, as: 'history' }
];

const buildQueryOrder = (userId, userRole) => {
  const query = {
    include: [
      { model: User, as: 'user' },
    ],
    order: [
      ['id', 'DESC']
    ]
  };

  if (userRole == roles.MERCHANT) {
    query.include.push({
      model: Restaurant,
      as: 'restaurant',
      where: { userId }
    });
  } else {
    query.where = {
      userId
    };
    query.include.push({
      model: Restaurant,
      as: 'restaurant'
    });
  }

  return query;
}

const ordersController = {

  /**
   * Creates a new order if a previous pending one is open it's deleted
   */
  add(req, res, next) {
    const { restaurantId, address } = req.body;
    const { userId } = req.auth;

    const buildBlockedQuery = (merchantId) => ({
      where: {
        customerId: userId,
        merchantId
      }
    });

    const deleteOrders = {
      where: {
        userId,
        status: orderStatus.OPEN
      }
    }

    const order = {
      userId,
      address,
      restaurantId,
      delivery: 0,
      total: 0
    };

    Restaurant
      .findByPk(restaurantId)
      .then(restaurant => {
        if (!restaurant)
          throw NotFound;

        order.total = restaurant.delivery;
        order.delivery = restaurant.delivery;
        return Blocked.findOne(buildBlockedQuery(restaurant.userId));
      })
      .then(blocked => {
        if (blocked)
          throw BadRequest;

        return Order.findAll(deleteOrders);
      })
      .then(orders => orders.forEach(obj => obj.destroy()))
      .then(() => Order.create(order))
      .then(order => res.status(HttpStatus.OK).send(order))
      .catch(next);
  },

  /**
   * Responsable for status updates
   */
  update(req, res, next) {
    const user = req.auth;
    const { id: orderId } = req.params;
    const { status } = req.body;
    const include = [
      { model: OrderItem, as: 'items' },
      { model: Restaurant, as: 'restaurant' }
    ];
    const includeHistory = [
      { model: OrderHistoryItem, as: 'history' }
    ];
    const history = {
      orderId,
      status,
      userId: user.userId
    };

    Order
      .findByPk(orderId, { include })
      .then(order => {
        if (!order)
          throw NotFound;

        if (!order.items || order.items.length === 0)
          throw BadRequestWithMsg('No items on this order');

        if (!statusChangeService.isValid(user, order, status))
          throw BadRequestWithMsg('Invalid status change');

        return Promise.all([OrderHistoryItem.create(history), order.update({ status })]);
      })
      .then(() => Order.findByPk(orderId, { include: includeHistory }))
      .then(result => res.status(HttpStatus.OK).send(result))
      .catch(next);
  },

  addMealToOrder(req, res, next) {
    const { id: orderId } = req.params;
    const { mealId, quantity } = req.body;
    const { userId } = req.auth;
    OrderHistoryItem
    const emptyOrderItem = {
      orderId,
      mealId,
      quantity,
      total: 0
    };

    const existingItem = {
      where: {
        orderId,
        mealId
      }
    }

    const include = [
      { model: OrderItem, as: 'items' }
    ];

    const buildOrderChanges = (order, item) => ({
      total: ((order.total * 1) + (item.total * 1)).toFixed(2)
    });

    let order, currentItem;

    Order
      .findByPk(orderId)
      .then(result => {
        if (!result || result.userId != userId)
          throw NotFound;

        order = result;
        return OrderItem.findOne(existingItem);
      })
      .then(item => {
        currentItem = item;
        return Meal.findByPk(mealId);
      })
      .then(meal => {
        if (!meal || (!currentItem && quantity == 0))
          throw NotFound;

        const itemTotal = (meal.price * quantity).toFixed(2);
        if (currentItem) { // existing item
          const diff = quantity - currentItem.quantity;
          const itemDiff = diff * meal.price;
          const total = ((order.total * 1) + (itemDiff * 1)).toFixed(2);

          let itemPromise;
          if (quantity == 0) {
            itemPromise = currentItem.destroy();
          } else {
            itemPromise = currentItem.update({
              quantity,
              total: itemTotal
            });
          }
          return Promise.all([itemPromise, order.update({ total })]);
        } else { // new item
          const newItem = emptyOrderItem;
          newItem.total = itemTotal;
          const total = ((order.total * 1) + (itemTotal * 1)).toFixed(2);
          return Promise.all([order.update({ total }), OrderItem.create(newItem)]);
        }
      })
      .then(() => res.status(HttpStatus.OK).send(order))
      .catch(next);
  },

  list(req, res, next) {
    const { userId, userRole } = req.auth;
    const query = buildQueryOrder(userId, userRole);
    query.include.push({ model: OrderItem, as: 'items', include: [{ model: Meal, as: 'meal' }] });
    query.include.push({ model: OrderHistoryItem, as: 'history' });

    Order
      .findAll(query)
      .then(orders => res.status(HttpStatus.OK).send(orders))
      .catch(next);
  },

  /**
   * If it's a merchant we identify if the user that made the order is blocked.
   */
  getById(req, res, next) {
    const { userId, userRole } = req.auth;
    const { id } = req.params;
    const query = buildQueryOrder(userId, userRole);
    query.where = { id };
    query.include = orderDetails;

    Order.
      findOne(query)
      .then(order => {
        if (!order)
          throw NotFound;

        res.status(HttpStatus.OK).send(order);
      })
      .catch(next);

  }

}

module.exports = ordersController;