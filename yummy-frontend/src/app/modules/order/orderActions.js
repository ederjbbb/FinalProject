import { MODULE_NAME } from './orderConstants';
import { requestActions } from '../../util'

/**
 * Actions constants
 */
export const ADD_USER = requestActions(MODULE_NAME, 'ADD_USER');
export const CREATE_ORDER = requestActions(MODULE_NAME, 'CREATE_ORDER');
export const UPDATE_MEAL_ORDER = requestActions(MODULE_NAME, 'UPDATE_MEAL_ORDER');
export const LIST_ORDERS = requestActions(MODULE_NAME, 'LIST_ORDERS');
export const UPDATE_ORDER_STATUS = requestActions(MODULE_NAME, 'UPDATE_ORDER_STATUS');
export const CHECKOUT = requestActions(MODULE_NAME, 'CHECKOUT');
export const UPDATE_MEAL_FROM_ORDER = requestActions(MODULE_NAME, 'UPDATE_MEAL_FROM_ORDER');
export const DELETE_MEAL_FROM_ORDER = requestActions(MODULE_NAME, 'DELETE_MEAL_FROM_ORDER');
export const GET_ORDER = requestActions(MODULE_NAME, 'GET_ORDER');

export const ADD_ADDRESS = `${MODULE_NAME}/ADD_ADDRESS`;
export const UPDATE_MEAL = `${MODULE_NAME}/UPDATE_MEAL`;

/**
 * Action creators
*/
export const addAddress = (address, reload = true) => ({
  type: ADD_ADDRESS,
  payload: {address, reload}
})

export const udpateMeal = (item) => ({
  type: UPDATE_MEAL,
  payload: item
})
