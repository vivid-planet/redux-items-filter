import { createReducer } from 'redux-act';
import {
    initialize,
    setQuery,
    resetQuery,
    changeItemsView,
    toggleFilterController
} from '../actions/index';
import {
    fetchItems,
    fetchItemsNextPage,
    fetchItemsLocations,
    fetchItemDetail
} from '../actions/asyncActions';
import { calculatePagesLeft } from '../utils';


export const defaultsState = {
    filterInitialized: false,
    itemsView: 'list',
    loading: false,
    visibleItems: [],
    visibleItemsPaged: [],
    foundItemsCount: 0,
    currentPage: 1,
    pagesLeft: 0,
    currentQuery: {},
    initialQuery: {},
    startTimeOfRequest: null,
    // currentResource: null,
    // currentResourceShort: null,
    error: null,
    locationItems: {
        startTimeOfRequest: null,
        loading: false,
        items: [],
        error: null
    },
    focusedItem: {
        loading: false,
        item: null,
        error: null
    },
    filterControllerVisible: true
};


export default createReducer({
    [initialize]: (state/* , payload */) => {
        return {
            ...state,
            filterInitialized: true,
            currentQuery: {...state.initialQuery}  // keep  a reference to the initial query, to be able to restore the initial state on reset
        };
    },
    [resetQuery]: (state) => {
        return {
            ...state,
            currentQuery: {...state.initialQuery}
        };
    },
    [setQuery]: (state, params) => {
        const { query } = params;
        return {
            ...state,
            currentQuery: query
        };
    },
    [fetchItems.request]: (state, params) => {
        const { startTimeOfRequest } = params;
        // replace with defaultsState if you want to rest the state everytime a new query starts
        return {
            ...state,
            startTimeOfRequest,
            loading: true,
            error: null
        };
    },
    [fetchItems.ok]: (state, payload) => {
        const foundItemsCount = payload.response.data.total;
        const currentPage = 1;
        const startTimeOfRequest = payload.request[0].startTimeOfRequest;
        const pageLimit = payload.request[0].pageLimit;

        if (startTimeOfRequest !== state.startTimeOfRequest) {
            return state; // ignore requests that where overhauled by a later request
        }
        return {
            ...state,
            loading: false,
            visibleItemsPaged: [
                {
                    page: 1,
                    items: payload.response.data.data
                }
            ],
            visibleItems: payload.response.data.data,
            foundItemsCount,
            currentPage,
            pagesLeft: calculatePagesLeft(foundItemsCount, currentPage, pageLimit)
            // currentResource: payload.response.config.url,
            // currentResourceShort: payload.response.config.url.slice(payload.response.config.baseURL.length)
        };
    },
    [fetchItems.error]: (state, payload) => (
        {
            ...state,
            loading: false,
            error: payload.error
        }
    ),
    [fetchItems.reset]: () => (defaultsState),
    [fetchItemsNextPage.request]: (state) => (
        {
            ...state,
            loading: true,
            error: null
        }
    ),
    [fetchItemsNextPage.ok]: (state, payload) => {
        const currentPage = parseInt(state.currentPage + 1, 10);
        const pageLimit = payload.request[0].pageLimit;

        return {
            ...state,
            loading: false,
            visibleItemsPaged: [...state.visibleItemsPaged, ...[
                {
                    page: currentPage,
                    items: payload.response.data.data
                }
            ]],
            visibleItems: [...state.visibleItems, ...payload.response.data.data ],
            currentPage,
            pagesLeft: calculatePagesLeft(payload.response.data.total, currentPage, pageLimit)
        };
    },
    [fetchItemsLocations.request]: (state, params) => {
        const { startTimeOfRequest } = params;
        return {
            ...state,
            locationItems: {
                ...state.locationItems,
                // items: [],
                loading: true,
                error: null,
                startTimeOfRequest
            }
        };
    },
    [fetchItemsLocations.ok]: (state, payload) => {
        const startTimeOfRequest = payload.request[0].startTimeOfRequest;
        if (startTimeOfRequest !== state.locationItems.startTimeOfRequest) {
            return state; // ignore requests that where overhauled by a later request
        }
        return {
            ...state,
            locationItems: {
                ...state.locationItems,
                loading: false,
                items: payload.response.data.data,
                error: null
            }
        };
    },
    [fetchItemsLocations.error]: (state, payload) => (
        {
            ...state,
            locationItems: {
                ...state.locationItems,
                items: [],
                loading: false,
                error: payload.error
            }
        }
    ),
    [fetchItemDetail.request]: (state) => (
        {
            ...state,
            focusedItem: {
                ...state.focusedItem,
                loading: true,
                error: null
            }
        }
    ),
    [fetchItemDetail.ok]: (state, payload) => (
        {
            ...state,
            focusedItem: {
                ...state.focusedItem,
                loading: false,
                item: payload.response.data.data,
                error: null
            }
        }
    ),
    [fetchItemDetail.error]: (state, payload) => (
        {
            ...state,
            focusedItem: {
                ...state.focusedItem,
                loading: false,
                error: payload.error,
                item: null
            }
        }
    ),
    [changeItemsView]: (state, { itemsView }) => {
        return {
            ...state,
            itemsView
        };
    },
    [toggleFilterController]: (state) => {
        return             {
            ...state,
            filterControllerVisible: !state.filterControllerVisible
        };
    }
}, defaultsState);
