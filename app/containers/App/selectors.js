import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');

const selectHome = state => state.get('home');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectActiveFormId = () =>
  createSelector(selectHome, homeState => homeState.get('activeFormId'));

const makeSelectActiveClassId = () =>
  createSelector(selectHome, homeState => homeState.get('activeClassId'));

const makeSelectNewClassFields = () =>
  createSelector(selectHome, homeState => homeState.get('newClassFields').toJS());

const makeSelectNewStudentClassFields = () =>
  createSelector(selectHome, homeState => homeState.get('newStudentClassFields').toJS());

const makeSelectStudents = () =>
  createSelector(selectHome, homeState => homeState.get('students').toJS());

const makeSelectClasses = () =>
  createSelector(selectHome, homeState => homeState.get('classes').toJS());

export {
  makeSelectLocation,
  makeSelectActiveFormId,
  makeSelectActiveClassId,
  makeSelectNewClassFields,
  makeSelectNewStudentClassFields,
  makeSelectStudents,
  makeSelectClasses,
};
