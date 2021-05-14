import { call, put, select, race, takeEvery } from 'redux-saga/effects';
import api from '../api';
import modules from '../modules';
import { push, LOCATION_CHANGE } from 'connected-react-router';

function* goToHome(action) {
  const { pathname } = action.payload.args;
  const user = yield select(modules.auth.selectors.getUser);
  const address = yield select(modules.order.selectors.getOrderAddress);
  const customerRoutes = ['', '/', '/restaurants', '/orders']
  const merchantRoutes = ['/business', '/business/orders']

  if (user && user.role == 'merchant') {
    if (!merchantRoutes.includes(pathname))
      yield put(push('/business'));

  } else if (user && user.role == 'customer') {
    if (!customerRoutes.includes(pathname)) {
      if (address)
        yield put(push('/restaurants'));
      else
        yield put(push('/'));
    }
  } else {
    yield put(push('/'));
  }
}

function reAuth(pathname) {
  return function* renew() {

    yield put(modules.connectivity.actions.requestApiCall(
      api.callNames.RENEW_TOKEN,
      {
        renew: localStorage.getItem('renew'),
        pathname
      },
      modules.auth.actions.RENEW_TOKEN
    ))
  }
}

function* checkAuth({ payload }) {
  const previousLocations = yield select(modules.router.selectors.getPreviousLocations)
  const user = yield select(modules.auth.selectors.getUser);
  const { pathname } = payload.location;
  const loginRoutes = ['', '/', '/login', '/businessLogin']

  const openingThePage = previousLocations.length === 1;
  if ((pathname != '/' && pathname != '/login' && pathname != '/businessLogin') || openingThePage) {
    if (!user && !localStorage.getItem('renew') && !loginRoutes.includes(pathname))
      yield put(push('/'))

    if (!user && localStorage.getItem('renew')) {
      const reload = false;
      yield put(modules.order.actions.addAddress(localStorage.getItem('address'), reload));
      yield call(reAuth(pathname))
    }
  }
}


function* watchCallRequests() {
  yield takeEvery(modules.auth.actions.LOGIN.SUCCEEDED, goToHome);
  yield takeEvery(modules.auth.actions.ADD_USER.SUCCEEDED, goToHome);
  yield takeEvery(modules.auth.actions.RENEW_TOKEN.SUCCEEDED, goToHome);
  yield takeEvery(modules.auth.actions.LOGOUT.SUCCEEDED, goToHome);
  yield takeEvery(LOCATION_CHANGE, checkAuth);
}

function* authSaga() {
  yield watchCallRequests();
}

export default authSaga;