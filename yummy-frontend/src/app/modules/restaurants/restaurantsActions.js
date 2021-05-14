import { MODULE_NAME } from './restaurantsConstants';
import { requestActions } from '../../util'

/**
 * Actions constants
 */
export const GET_RESTAURANTS = requestActions(MODULE_NAME, 'GET_RESTAURANTS');
export const GET_RESTAURANTS_PUBLIC = requestActions(MODULE_NAME, 'GET_RESTAURANTS_PUBLIC');
export const GET_MEALS = requestActions(MODULE_NAME, 'GET_MEALS');

export const SELECT_RESTAURANT = `${MODULE_NAME}/SELECT_RESTAURANT`;
export const SELECT_MEAL = `${MODULE_NAME}/SELECT_MEAL`

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