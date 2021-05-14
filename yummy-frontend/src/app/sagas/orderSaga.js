import { delay } from 'redux-saga/effects';
import { call, put, select, race, takeEvery } from 'redux-saga/effects';
import api from '../api';
import modules from '../modules';
import { push, LOCATION_CHANGE } from 'connected-react-router';

function* goToOrders(action) {
  yield put(modules.connectivity.actions.requestApiCall(
    api.callNames.LIST_ORDERS,
    {},
    modules.order.actions.LIST_ORDERS
  ));
  yield put(push('/orders'));
}

function* checkNavigation({ payload }) {
  const { pathname } = payload.location;
  if (pathname.includes('/orders'))
    yield put(modules.connectivity.actions.requestApiCall(
      api.callNames.LIST_ORDERS,
      {},
      modules.order.actions.LIST_ORDERS
    ));

  if (pathname == '/restaurants')
    yield put(modules.connectivity.actions.requestApiCall(
      api.callNames.GET_RESTAURANTS,
      {},
      modules.restaurants.actions.GET_RESTAURANTS
    ))
}

function* watchCallRequests(payload) {
  yield takeEvery(modules.order.actions.CHECKOUT.SUCCEEDED, goToOrders);

  yield takeEvery(LOCATION_CHANGE, checkNavigation);
}

function* orderSaga() {
  yield watchCallRequests();
}

export default orderSaga;