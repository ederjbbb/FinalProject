import { MODULE_NAME } from './businessConstants';
import { requestActions } from '../../util'

/**
 * Actions constants
 */
export const GET_RESTAURANTS = requestActions(MODULE_NAME, 'GET_BUSINESS_RESTAURANTS');
export const ADD_RESTAURANT = requestActions(MODULE_NAME, 'ADD_BUSINESS_RESTAURANT');
export const UPDATE_RESTAURANT = requestActions(MODULE_NAME, 'UPDATE_BUSINESS_RESTAURANT');
export const DELETE_RESTAURANT = requestActions(MODULE_NAME, 'DELETE_BUSINESS_RESTAURANT');

export const GET_MEALS = requestActions(MODULE_NAME, 'GET_BUSINESS_MEALS');
export const ADD_MEAL = requestActions(MODULE_NAME, 'ADD_BUSINESS_MEALS');
export const UPDATE_MEAL = requestActions(MODULE_NAME, 'UPDATE_BUSINESS_MEALS');
export const DELETE_MEAL = requestActions(MODULE_NAME, 'DELETE_BUSINESS_MEALS');

export const SELECT_RESTAURANT = `${MODULE_NAME}/SELECT_BUSINESS_RESTAURANT`;
export const SELECT_MEAL = `${MODULE_NAME}/SELECT_BUSINESS_MEAL`

/**
 * Action creators
*/

export const selectRestaurant = (restaurant) => ({
  type: SELECT_RESTAURANT,
  payload: {restaurant}
})

export const selectMeal = (meal) => ({
  type: SELECT_MEAL,
  payload: {meal}
})