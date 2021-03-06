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
import { OPEN_FORM, CLOSE_FORM, ADD_CLASS, UPDATE_NEW_CLASS_FIELDS,
  RESET_NEW_CLASS_FIELDS, DELETE_CLASS, UPDATE_NEW_STUDENT_CLASS_FIELDS,
  RESET_NEW_STUDENT_CLASS_FIELDS, ADD_STUDENT_CLASS, DELETE_STUDENT_CLASS } from './constants';
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
  activeClassId: '',
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

function addStudentClass(state) {
  const newClasses = state.get('classes').toJS();
  const newStudentClass = state.get('newStudentClassFields').toJS();
  const studentClassIndex = newClasses.findIndex(
    classSingle => classSingle.classId === newStudentClass.classId,
  );
  const studentClass = newClasses[studentClassIndex];
  const studentClassStudents = newClasses[studentClassIndex].classStudents;
  const studentIndex = studentClassStudents.findIndex(
    studentId => studentId === newStudentClass.studentId,
  );

  // student id is unique and maximum number of students has not been reached
  if(studentIndex === -1 && (studentClassStudents.length < studentClass.classNumber)) {
    newClasses[studentClassIndex].classStudents.push(newStudentClass.studentId);

    return state.set('classes', fromJS(newClasses));
  }

  return state;
}

function deleteStudentClass(state, action) {
  const newClasses = state.get('classes').toJS();
  const studentClassIndex = newClasses.findIndex(
    classSingle => classSingle.classId === action.classId,
  );
  const studentClassStudents = newClasses[studentClassIndex].classStudents;
  const studentIndex = studentClassStudents.findIndex(
    studentId => studentId === action.studentId,
  );

  // student id exists in class
  if(studentIndex >= 0) {
    newClasses[studentClassIndex].classStudents.splice(studentIndex, 1);

    return state.set('classes', fromJS(newClasses));
  }

  return state;
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_FORM:
      return state.merge({
        activeFormId: action.formId,
        activeClassId: action.classId,
      });
    case CLOSE_FORM:
      return state.merge({
        activeFormId: '',
        activeClassId: '',
      });
    case ADD_CLASS:
      return addClass(state);
    case UPDATE_NEW_CLASS_FIELDS:
      return state.setIn(['newClassFields', action.property], action.value);
    case RESET_NEW_CLASS_FIELDS:
      return state.set('newClassFields', fromJS(newClassFieldsInitial));
    case DELETE_CLASS:
      return deleteClass(state, action);
    case UPDATE_NEW_STUDENT_CLASS_FIELDS:
      return state.setIn(['newStudentClassFields', action.property], action.value);
    case RESET_NEW_STUDENT_CLASS_FIELDS:
      return state.set('newStudentClassFields', fromJS(newStudentClassFieldsInitial));
    case ADD_STUDENT_CLASS:
      return addStudentClass(state);
    case DELETE_STUDENT_CLASS:
      return deleteStudentClass(state, action);
    default:
      return state;
  }
}

export default homeReducer;
