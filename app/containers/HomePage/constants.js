/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const OPEN_FORM = 'boilerplate/Home/OPEN_FORM';
export const CLOSE_FORM = 'boilerplate/Home/CLOSE_FORM';
export const UPDATE_NEW_CLASS_FIELDS = 'boilerplate/Home/UPDATE_NEW_CLASS_FIELDS';
export const RESET_NEW_CLASS_FIELDS = 'boilerplate/Home/RESET_NEW_CLASS_FIELDS';