import produce from 'immer';
import * as actions from './authActions';
import { AUTH_STEPS } from './authConstants';

/**
 * Reducers
 */
const initialState = {
  currentAuthStep: AUTH_STEPS.EMAIL,
  isInvalidLogin: false,
  isInvalidCode: false
};

export const reducer = produce((state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_BY_EMAIL.SUCCEEDED: {
      state.currentAuthStep = AUTH_STEPS.PASSWORD;
      break;
    }
    case actions.GET_USER_BY_EMAIL.FAILED: {
      state.currentAuthStep = AUTH_STEPS.PHONE;
      break;
    }
    case actions.RENEW_TOKEN.SUCCEEDED: 
    case actions.ADD_USER.SUCCEEDED:
    case actions.LOGIN.SUCCEEDED: {
      const { user, token, renew } = action.payload.data;
      state.user = user;
      state.currentAuthStep = AUTH_STEPS.EMAIL;
      state.isInvalidLogin = false;
      state.isInvalidCode = false;
      localStorage.setItem('token', token);
      localStorage.setItem('renew', renew);
      break;
    }
    case actions.LOGIN.FAILED: {
      state.isInvalidLogin = true;
      break;
    }
    case actions.VALIDATE_SMS.SUCCEEDED: {
      state.currentAuthStep = AUTH_STEPS.USER_DETAILS;
      break;
    }
    case actions.VALIDATE_SMS.FAILED: {
      state.isInvalidCode = true;
      break;
    }
    case actions.LOGOUT.SUCCEEDED: {
      state.user = undefined;
      state.currentAuthStep = AUTH_STEPS.EMAIL;
      state.isInvalidLogin = false;
      state.isInvalidCode = false;
      localStorage.removeItem('token');
      localStorage.removeItem('renew');
      localStorage.removeItem('address');
      break;
    }
    case actions.BLOCK_USER.SUCCEEDED: {
      alert('User blocked'); // should not be here
      break;
    }
    default:
      return state;
  }
});

export default reducer;
