import { createAction } from 'redux-act';
// import { calculateQueryOffset } from '../utils';
import { ACTION_PREFIX } from '../constants';

export const getItems = createAction(`${ACTION_PREFIX}_ITEMS_GET`);
export const getItemsNextPage = createAction(`${ACTION_PREFIX}_ITEMS_GET_NEXT_PAGE`);

// export const getItemsNextPage = createActionAsync('MODELFILTER_ITEMS_FETCH_NEXT_PAGE', ({filterName, resource, httpClient, pageLimit, restapiStringify}, dispatch, getState) => {
//     const currentPage = getState().modelFilter[filterName].currentPage;
//     const currentQuery = getState().modelFilter[filterName].currentQuery;
//     const queryForNextPage = { ...currentQuery, limit: pageLimit, start: calculateQueryOffset(currentPage + 1, pageLimit)};
//     return httpClient.get(`/api${resource}?${restapiStringify(queryForNextPage)}`);
// });

// export const getItemDetail = createActionAsync('MODELFILTER_ITEM_FETCH_DETAIL', ({id, resource, httpClient}) => {
//     return httpClient.get(`/api${resource}/${id}`);
// });
