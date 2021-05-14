import { put } from 'redux-saga/effects'
import modules from '../modules'
import api from '../api'

function* load() {
  const _modules = modules; 

  yield put(_modules.connectivity.actions.requestApiCall(
    api.callNames.GET_RESTAURANTS_PUBLIC,
    {},
    _modules.restaurants.actions.GET_RESTAURANTS_PUBLIC
  ));
}

function* initAppSaga() {
  yield load()
}

export default initAppSaga