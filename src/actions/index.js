import { createAction } from 'redux-act';
import { ACTION_PREFIX } from '../constants';

export const setQuery = createAction(`${ACTION_PREFIX}_SET_QUERY`);
export const resetQuery = createAction(`${ACTION_PREFIX}_RESET_QUERY`);

export const changeItemsView = createAction(`${ACTION_PREFIX}_CHANGE_ITEMS_VIEW`);
export const toggleFilterController = createAction(`${ACTION_PREFIX}_TOGGLE_FILTERCONTROLLER`);
export const initialize = createAction(`${ACTION_PREFIX}_INIT`);
