import { MODULE_NAME, DEFAULT_REQUEST_TIMEOUT_MS } from './connectivityConstants';
import { requestActions } from '../../util';

/**
 * Actions constants
 */
export const CONNECTIVITY_SAMPLE_REQUEST = requestActions(MODULE_NAME, 'CONNECTIVITY_SAMPLE_REQUEST');
export const API_CALL_REQUESTED = `${MODULE_NAME}/API_CALL_REQUESTED`;

/**
 * Action creators
 * https://github.com/acdlite/flux-standard-action
 */

export const requestApiCall =
  (callName, args, actions, timeoutMS = DEFAULT_REQUEST_TIMEOUT_MS) =>
    ({
      type: API_CALL_REQUESTED,
      payload: {
        callName,
        args,
        actions,
        timeoutMS
      }
    });

export const announceApiCall = (type, args) => ({
  type,
  payload: { args }
});

export const fulfillApiCall = (type, args, data) => ({
  type,
  payload: { args, data }
});

export const failApiCall = (type, args, error) => ({
  type,
  payload: { args },
  error: true,
  meta: error
});
