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

import { OPEN_FORM } from './constants';

// The initial state of the App
export const initialState = fromJS({
  activeFormId: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_FORM:
      return state.set('activeFormId', action.id);
    default:
      return state;
  }
}

export default homeReducer;
