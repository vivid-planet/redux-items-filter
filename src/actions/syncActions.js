import { createAction } from 'redux-act';
import { ACTION_PREFIX } from '../constants';

export const getItems = createAction(`${ACTION_PREFIX}_ITEMS_GET`);
export const getItemsNextPage = createAction(`${ACTION_PREFIX}_ITEMS_GET_NEXT_PAGE`);
