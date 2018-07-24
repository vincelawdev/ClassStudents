/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import { OPEN_FORM, CLOSE_FORM, ADD_CLASS, UPDATE_NEW_CLASS_FIELDS, RESET_NEW_CLASS_FIELDS, DELETE_CLASS } from './constants';
import content from '../../json/content.json';

// initial object of newClassFields
const newClassFieldsInitial = {
  classId: '',
  className: '',
  classNumber: '',
  classStart: '',
  classStudents: [],
};

// initial object of newStudentClassFields
const newStudentClassFieldsInitial = {
  studentId: '',
  classId: '',
};

// The initial state of the App
export const initialState = fromJS({
  activeFormId: '',
  newClassFields: newClassFieldsInitial,
  newStudentClassFields: newStudentClassFieldsInitial,
  students: content.Students,
  classes: content.Classes,
});

function addClass(state) {
  const newClasses = state.get('classes').toJS();
  const newClass = state.get('newClassFields').toJS();
  const classIndex = newClasses.findIndex(
    classSingle => classSingle.classId === newClass.classId,
  );

  // class id is unique
  if(classIndex === -1) {
    newClasses.push(newClass);

    return state.set('classes', fromJS(newClasses));
  }

  return state;
}

function deleteClass(state, action) {
  const newClasses = state.get('classes').toJS();
  const classIndex = newClasses.findIndex(
    classSingle => classSingle.classId === action.classId,
  );
  newClasses.splice(classIndex, 1);

  return state.set('classes', fromJS(newClasses));
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_FORM:
      return state.set('activeFormId', action.id);
    case CLOSE_FORM:
      return state.set('activeFormId', '');
    case ADD_CLASS:
      return addClass(state);
    case UPDATE_NEW_CLASS_FIELDS:
      return state.setIn(['newClassFields', action.property], action.value);
    case RESET_NEW_CLASS_FIELDS:
      return state.set('newClassFields', fromJS(newClassFieldsInitial));
    case DELETE_CLASS:
      return deleteClass(state, action);
    default:
      return state;
  }
}

export default homeReducer;
