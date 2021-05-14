import produce from 'immer';
import * as actions from './businessActions';

/**
 * Reducers
 */
const initialState = {
  restaurants: [],
  meals: [],
  selectedRestaurant: undefined,
  selectedMeal: undefined
};

export const reducer = produce((state = initialState, action) => {
  switch (action.type) {
    case actions.SELECT_RESTAURANT: {
      state.selectedRestaurant = action.payload.restaurant;
      break;
    }
    case actions.SELECT_MEAL: {
      state.selectedMeal = action.payload.meal;
      break;
    }
    case actions.GET_RESTAURANTS.SUCCEEDED: {
      state.restaurants = action.payload.data;
      break;
    }
    case actions.GET_MEALS.SUCCEEDED: {
      state.meals = action.payload.data;
      break;
    }
    case actions.DELETE_RESTAURANT.FAILED: {
      alert('Sorry, we were not able to delete the restaurant at the moment.');
      break;
    }
    
    default:
      return state;
  }
});

export default reducer;
