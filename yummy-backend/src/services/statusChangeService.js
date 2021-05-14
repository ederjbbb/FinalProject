const orderStatus = require('../constants/orderStatus');
const roles = require('../constants/roles');

/**
 * Service that know how to validate if a change on the status of the order is valid or not. 
 */
const statusChangeService = {
  isValid(user, order, newStatus) {
    const statusList = Object.values(orderStatus);
    const { userRole } = user;

    // status does not exist 
    if (!statusList.includes(newStatus))
      return false;

    // same status
    if (newStatus == order.status) 
      return false;

    // if it's a merchant is it the restaurant merchant? 
    if (userRole === roles.MERCHANT && user.userId !== order.restaurant.userId)
      return false

    // if it's a customer is it the user that created the order
    if (userRole === roles.CUSTOMER && user.userId !== order.userId)
      return false

    const currentIndex = statusList.indexOf(order.status);
    const newIndex = statusList.indexOf(newStatus);
    const diff = newIndex - currentIndex;

    // can't go to a previous state
    if (diff <= 0)
      return false;
    
    // can't move foward more than 1 index each time unless from in route or placed
    if (diff > 1 && ![orderStatus.IN_ROUTE, orderStatus.PLACED].includes(order.status))
      return false;

    // who can change the status FROM the left key status to the right array status 
    const from = {
      [orderStatus.OPEN]: [roles.CUSTOMER],
      [orderStatus.PLACED]: [roles.CUSTOMER, roles.MERCHANT],
      [orderStatus.CANCELED]: [],
      [orderStatus.PROCESSING]: [roles.MERCHANT],
      [orderStatus.IN_ROUTE]: [roles.MERCHANT, roles.CUSTOMER],
      [orderStatus.DELIVERED]: [roles.CUSTOMER],
      [orderStatus.RECEIVED]: []
    };

    if (!from[order.status].includes(userRole))
      return false;

    // who can change the status TO the left key status to the right array status 
    const to = {
      [orderStatus.OPEN]: [],
      [orderStatus.PLACED]: [roles.CUSTOMER],
      [orderStatus.CANCELED]: [roles.CUSTOMER],
      [orderStatus.PROCESSING]: [roles.MERCHANT],
      [orderStatus.IN_ROUTE]: [roles.MERCHANT],
      [orderStatus.DELIVERED]: [roles.MERCHANT],
      [orderStatus.RECEIVED]: [roles.CUSTOMER]
    };

    if (!to[newStatus].includes(userRole))
      return false;

    return true;
  }
}

module.exports = statusChangeService;