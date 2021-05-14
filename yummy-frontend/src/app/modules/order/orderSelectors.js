import { MODULE_NAME } from './orderConstants';

export const getOrderModule = state => state[MODULE_NAME];
export const getOrderAddress = state => state[MODULE_NAME].address;
export const getCurrentOrder = state => state[MODULE_NAME].order;
export const getOrders = state => state[MODULE_NAME].orders;

// export const getIsInvalidLogin = state => state[MODULE_NAME].isInvalidLogin;
// export const getIsInvalidCode = state => state[MODULE_NAME].isInvalidCode;
