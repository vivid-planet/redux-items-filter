import { createActionAsync } from 'redux-act-async';
import { calculateQueryOffset } from '../utils';
import { ACTION_PREFIX } from '../constants';
import { FORMAT_TO_REST_QUERYSTRING } from '../queryFormatter';

export const fetchItems = (createActionAsync(`${ACTION_PREFIX}_ITEMS_FETCH`, ({filterName, resource, httpClient, pageLimit, queryFormatter}, dispatch, getState) => {
    const currentQuery = getState().itemsFilter[filterName].currentQuery;
    const apiQuery = { ...currentQuery, limit: pageLimit, start: calculateQueryOffset(1, pageLimit)};

    return httpClient.get(`/api${resource}?${queryFormatter(apiQuery, {type: FORMAT_TO_REST_QUERYSTRING})}`);
}));

export const fetchItemsLocations = createActionAsync(`${ACTION_PREFIX}_ITEMS_LOCATIONS_FETCH`, ({filterName, resourceLocations, httpClient, queryFormatter}, dispatch, getState) => {
    return httpClient.get(`/api${resourceLocations}?${queryFormatter(getState().itemsFilter[filterName].currentQuery, {type: FORMAT_TO_REST_QUERYSTRING})}`);
});

export const fetchItemsNextPage = createActionAsync(`${ACTION_PREFIX}_ITEMS_FETCH_NEXT_PAGE`, ({filterName, resource, httpClient, pageLimit, queryFormatter}, dispatch, getState) => {
    const currentPage = getState().itemsFilter[filterName].currentPage;
    const currentQuery = getState().itemsFilter[filterName].currentQuery;
    const queryForNextPage = { ...currentQuery, limit: pageLimit, start: calculateQueryOffset(currentPage + 1, pageLimit)};
    return httpClient.get(`/api${resource}?${queryFormatter(queryForNextPage, {type: FORMAT_TO_REST_QUERYSTRING})}`);
});

export const fetchItemDetail = createActionAsync(`${ACTION_PREFIX}_ITEM_FETCH_DETAIL`, ({id, resource, httpClient}) => {
    return httpClient.get(`/api${resource}/${id}`);
});
