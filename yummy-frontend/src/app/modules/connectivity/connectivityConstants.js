/**
 * http://jaysoo.ca/2016/02/28/organizing-redux-application/
 */
import { isTest } from '../../util';

export const MODULE_NAME = 'connectivity';
export const DEFAULT_REQUEST_TIMEOUT_MS = isTest() ? 1000 : 60 * 1000;
