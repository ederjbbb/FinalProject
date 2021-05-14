import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { createRootReducer } from './modules';
import sagas from './sagas';

export const history = createBrowserHistory();

const createEnhancersAndMiddlewares = (isDevelopment, sagaMiddleware) => {
  const enhancers = []
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ]
  /* eslint-disable no-underscore-dangle */
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  return isDevelopment
    ? {
      enhancers: typeof devToolsExtension === 'function' ? [...enhancers, devToolsExtension()] : enhancers,
      middlewares: [...middlewares, createLogger()]
    }
    : {
      enhancers,
      middlewares
    }
}

const sagaMiddleware = createSagaMiddleware()

const { enhancers, middlewares } = createEnhancersAndMiddlewares(process.env.NODE_ENV === 'development', sagaMiddleware)

const initialState = {}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)

const store = {
  ...createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  ),
  sagas: Object.keys(sagas).map((sagaName) => sagaMiddleware.run(sagas[sagaName]))
}

export default store;