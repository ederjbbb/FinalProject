/**
 * Selectors
 * http://jaysoo.ca/2016/02/28/organizing-redux-application/
 */
import { MODULE_NAME } from './authConstants';

export const getAuth = state => state[MODULE_NAME];
export const getUser = state => state[MODULE_NAME].user;
export const getIsUserLogged = state => !!state[MODULE_NAME].user;
export const getCurrentAuthStep = state => state[MODULE_NAME].currentAuthStep;
export const getIsInvalidLogin = state => state[MODULE_NAME].isInvalidLogin;
export const getIsInvalidCode = state => state[MODULE_NAME].isInvalidCode;
