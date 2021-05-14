import { MODULE_NAME } from './authConstants';
import { requestActions } from '../../util'

/**
 * Actions constants
 */
export const GET_USER_BY_EMAIL = requestActions(MODULE_NAME, 'GET_USER_BY_EMAIL');
export const LOGIN = requestActions(MODULE_NAME, 'LOGIN');
export const SEND_SMS = requestActions(MODULE_NAME, 'SEND_SMS');
export const VALIDATE_SMS = requestActions(MODULE_NAME, 'VALIDATE_SMS');
export const ADD_USER = requestActions(MODULE_NAME, 'ADD_USER');
export const RENEW_TOKEN = requestActions(MODULE_NAME, 'RENEW_TOKEN');
export const LOGOUT = requestActions(MODULE_NAME, 'LOGOUT');
export const BLOCK_USER = requestActions(MODULE_NAME, 'BLOCK_USER');
