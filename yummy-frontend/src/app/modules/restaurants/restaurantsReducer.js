import produce from 'immer';
import * as actions from './restaurantsActions';

/**
 * Reducers
 */
const initialState = {
  restaurants: [],
  homeRestaurants: [],
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
    case actions.GET_RESTAURANTS_PUBLIC.SUCCEEDED: {
      state.homeRestaurants = action.payload.data;
      break;
    }
    case actions.GET_MEALS.SUCCEEDED: {
      state.meals = action.payload.data;
      break;
    }
    // case actions.GET_USER_BY_EMAIL.FAILED: {
    //   state.currentAuthStep = AUTH_STEPS.PHONE;
    //   break;
    // }
    // case actions.LOGIN.SUCCEEDED: {
    //   const { user, token, renew } = action.payload.data;
    //   state.user = user;
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('renew', renew);
    //   break;
    // }
    // case actions.LOGIN.FAILED: {
    //   state.isInvalidLogin = true;
    //   break;
    // }
    // case actions.VALIDATE_SMS.SUCCEEDED: {
    //   state.currentAuthStep = AUTH_STEPS.USER_DETAILS;
    //   break;
    // }
    // case actions.VALIDATE_SMS.FAILED: {
    //   state.isInvalidCode = true;
    //   break;
    // }
    // case actions.ADD_USER.SUCCEEDED: {
    //   const { user, token, renew } = action.payload.data;
    //   state.user = user;
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('renew', renew);
    //   break;
    // }
    
    default:
      return state;
  }
});

export default reducer;
