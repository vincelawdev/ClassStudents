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

import { OPEN_FORM, CLOSE_FORM } from './constants';

// open form by form id
export function openForm(id) {
  return {
    type: OPEN_FORM,
    id,
  };
}

// close form by passing empty string '' in form id
export function closeForm(id) {
  return {
    type: CLOSE_FORM,
    id,
  };
}