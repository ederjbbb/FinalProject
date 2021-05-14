import produce from 'immer';
import * as actions from './orderActions';

/**
 * Reducers
 */
const initialState = {
  address: undefined,
  order: undefined,
  orders: []
};

export const reducer = produce((state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ADDRESS: {
      state.address = action.payload.address;
      localStorage.setItem('address', action.payload.address);
      break;
    }
    case actions.CREATE_ORDER.SUCCEEDED: {
      state.order = action.payload.data;
      break;
    }
    case actions.UPDATE_MEAL_ORDER.SUCCEEDED: {
      state.order = {...state.order, ...action.payload.data};
      break;
    }
    case actions.LIST_ORDERS.SUCCEEDED: {
      state.orders = action.payload.data;
      break;
    }
    case actions.UPDATE_ORDER_STATUS.SUCCEEDED: {
      const udpatedOrder = action.payload.data;
      const oldOrder = state.orders.find(order => order.id === udpatedOrder.id);
      oldOrder.status = udpatedOrder.status;
      break;
    }
    case actions.UPDATE_MEAL: {
      const items = state.order.items || [];
      const item = items.find((item) => item.id == action.payload.id);

      if (action.payload.quantity == 0) {
        items.splice(items.indexOf(item), 1);
      } else {
        if (item)
          item.quantity = action.payload.quantity;
        else 
         items.push(action.payload);
      }

      state.order.items = items;
      break;
    }
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
