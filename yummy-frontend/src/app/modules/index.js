import { combineReducers } from 'redux'
import * as connectivity from './connectivity'
import * as auth from './auth'
import * as order from './order'
import * as router from './router';
import * as restaurants from './restaurants';
import * as business from './business';

export default {
  connectivity,
  router,
  auth,
  order,
  restaurants,
  business
}

export const createRootReducer = (history) => combineReducers({
  connectivity: connectivity.reducers.reducer,
  router: router.reducers.reducer(history),
  auth: auth.reducers.reducer,
  order: order.reducers.reducer,
  restaurants: restaurants.reducers.reducer,
  business: business.reducers.reducer
})