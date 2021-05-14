import { createSelector } from 'reselect';

/**
 * Selectors
 */
import MODULE_NAME from './routerConstants';

export const getRouting = state => state[MODULE_NAME];
export const getPreviousLocations = state => state[MODULE_NAME].previousLocations;
export const getLocation = state => state[MODULE_NAME].location;

export const getPathName = createSelector(
  getLocation,
  location => location.pathname
);

export const getPreviousLocation = createSelector(
  getPreviousLocations,
  previousLocations => previousLocations.slice(-2)[0]
);

export const getPreviousPathName = createSelector(
  getPreviousLocations,
  getPathName,
  (previousLocations, currentPathName) => {
    const lastValidLocation = previousLocations.findLast(item => item.pathname !== currentPathName);
    return lastValidLocation ? lastValidLocation.pathname : '/';
  }
);
