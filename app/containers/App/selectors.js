import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');

const selectHome = state => state.get('home');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectActiveFormId = () =>
  createSelector(selectHome, homeState => homeState.get('activeFormId'));

export {
  makeSelectLocation,
  makeSelectActiveFormId,
};
