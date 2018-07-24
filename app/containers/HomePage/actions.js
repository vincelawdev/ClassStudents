/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { OPEN_FORM, CLOSE_FORM, ADD_CLASS, UPDATE_NEW_CLASS_FIELDS,
  RESET_NEW_CLASS_FIELDS, DELETE_CLASS, UPDATE_NEW_STUDENT_CLASS_FIELDS,
  RESET_NEW_STUDENT_CLASS_FIELDS, ADD_STUDENT_CLASS, DELETE_STUDENT_CLASS } from './constants';

// open form by form id and set active form id and class id
export function openForm(formId, classId) {
  return {
    type: OPEN_FORM,
    formId,
    classId,
  };
}

// close form by and set empty string ''
export function closeForm() {
  return {
    type: CLOSE_FORM,
  };
}

// add class by adding object to classes array
export function addClass() {
  return {
    type: ADD_CLASS,
  };
}

// update new class fields by passing in property and value
export function updateNewClassFields(property, value) {
  return {
    type: UPDATE_NEW_CLASS_FIELDS,
    property,
    value,
  };
}

// reset new class fields
export function resetNewClassFields() {
  return {
    type: RESET_NEW_CLASS_FIELDS,
  };
}

// delete class by class id
export function deleteClass(classId) {
  return {
    type: DELETE_CLASS,
    classId,
  };
}

// update new student class fields by passing in property and value
export function updateNewStudentClassFields(property, value) {
  return {
    type: UPDATE_NEW_STUDENT_CLASS_FIELDS,
    property,
    value,
  };
}

// reset new student class fields
export function resetNewStudentClassFields() {
  return {
    type: RESET_NEW_STUDENT_CLASS_FIELDS,
  };
}

// add class by adding object to classes array
export function addStudentClass() {
  return {
    type: ADD_STUDENT_CLASS,
  };
}

// delete student from class by student id and class id
export function deleteStudentClass(studentId, classId) {
  return {
    type: DELETE_STUDENT_CLASS,
    studentId,
    classId,
  };
}