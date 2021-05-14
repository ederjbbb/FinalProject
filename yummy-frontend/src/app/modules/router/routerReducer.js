import produce from 'immer'
import { concat, merge } from 'lodash/fp'
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router'

/**
 * Reducers
 */

export const reducer = (history) => {
  const connectedRouterReducer = connectRouter(history)

  return produce((state, action) => {
    const { type, payload } = action
    const connectedRouterState = connectedRouterReducer(state, action)
    // eslint-disable-next-line no-param-reassign
    state = merge(state, connectedRouterState)

    switch (type) {
    case LOCATION_CHANGE: {
      state.previousLocations = concat(payload, state.previousLocations || [])
      break
    }
    default:
      break
    }

    return state
  })
}

export default reducer