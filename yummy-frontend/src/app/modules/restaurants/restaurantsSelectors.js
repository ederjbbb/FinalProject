import { MODULE_NAME } from './restaurantsConstants';

export const getRestaurantsModule = state => state[MODULE_NAME];
export const getRestaurants = state => state[MODULE_NAME].restaurants;
export const getSelectedRestaurant = state => state[MODULE_NAME].selectedRestaurant;
export const getMeals = state => state[MODULE_NAME].meals;
export const getSelectedMeal = state => state[MODULE_NAME].selectedMeal;
export const getHomeRestaurants = state => state[MODULE_NAME].homeRestaurants;
