import { call, put, select, race, takeEvery } from 'redux-saga/effects';
import api from '../api';
import modules from '../modules';
import { push, LOCATION_CHANGE } from 'connected-react-router';

function* checkNavigation({ payload }) {
  const { pathname } = payload.location;
  if (pathname == '/business')
    yield put(modules.connectivity.actions.requestApiCall(
      api.callNames.GET_RESTAURANTS,
      {},
      modules.business.actions.GET_RESTAURANTS
    ));
  
  if (pathname == '/business/meals') {
    const restaurant = yield select(modules.business.selectors.getSelectedRestaurant);
    yield put(modules.connectivity.actions.requestApiCall(
      api.callNames.GET_MEALS,
      {restaurantId: restaurant.id},
      modules.business.actions.GET_MEALS
    ));
  }
}

function* loadMeals({ payload }) {
  const restaurant = yield select(modules.business.selectors.getSelectedRestaurant);
  yield put(modules.connectivity.actions.requestApiCall(
    api.callNames.GET_MEALS,
    {restaurantId: restaurant.id},
    modules.business.actions.GET_MEALS
  ));
} 

function* loadRestaurants({ payload }) {
  yield put(modules.connectivity.actions.requestApiCall(
    api.callNames.GET_RESTAURANTS,
    {},
    modules.business.actions.GET_RESTAURANTS
  ))
}

function* watchCallRequests(payload) {
  yield takeEvery(modules.business.actions.UPDATE_RESTAURANT.SUCCEEDED, loadRestaurants);
  yield takeEvery(modules.business.actions.ADD_RESTAURANT.SUCCEEDED, loadRestaurants);
  yield takeEvery(modules.business.actions.DELETE_RESTAURANT.SUCCEEDED, loadRestaurants);
  yield takeEvery(modules.business.actions.UPDATE_MEAL.SUCCEEDED, loadMeals);
  yield takeEvery(modules.business.actions.ADD_MEAL.SUCCEEDED, loadMeals);
  yield takeEvery(modules.business.actions.DELETE_MEAL.SUCCEEDED, loadMeals);
  yield takeEvery(LOCATION_CHANGE, checkNavigation);
}

function* orderSaga() {
  yield watchCallRequests();
}

export default orderSaga;