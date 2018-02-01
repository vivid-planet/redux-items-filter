import { createReducer } from 'redux-act';
import {
    initialize,
    setQuery,
    resetQuery,
    changeItemsView,
    toggleFilterController
} from '../actions/index';
import {
    getItems,
    getItemsNextPage
} from '../actions/syncActions';
import { calculatePagesLeft } from '../utils';


export const defaultsState = {
    filterInitialized: false,
    itemsView: 'list',
    collection: [],
    filteredItems: [],
    filteredItemsPaged: [],
    visibleItems: [],
    visibleItemsPaged: [],
    foundItemsCount: 0,
    currentPage: 1,
    pagesLeft: 0,
    currentQuery: {},
    initialQuery: {},
    focusedItem: {
        item: null
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
    },
    [getItems]: (state, {pageLimit, filterCollectionReducer}) => {
        const filteredItems = filterCollectionReducer(state.collection, state.currentQuery);
        let _currentPage = 0;
        const filteredItemsPaged = filteredItems.reduce( (accumulator, curr, i ) => {
            if (  i % pageLimit  === 0) {
                _currentPage++;
                return [...accumulator, {page: _currentPage, items: [curr] }]; // start a new page
            }
            return accumulator.map( innerCurr => (innerCurr.page === _currentPage ) ? {...innerCurr, items: [...innerCurr.items, curr ]} : innerCurr ); // add the item to the currrent page
        }, []);
        const currentPage = 1;
        const foundItemsCount = filteredItems.length;
        return {
            ...state,
            filteredItems,
            filteredItemsPaged,
            visibleItemsPaged: [
                {
                    page: 1,
                    items: (filteredItemsPaged[0]) ? [...filteredItemsPaged[0].items] : []
                }
            ],
            visibleItems: (filteredItemsPaged[0]) ? [...filteredItemsPaged[0].items] : [],
            currentPage,
            foundItemsCount,
            pagesLeft: calculatePagesLeft(foundItemsCount, currentPage, pageLimit)
        };
    },
    [getItemsNextPage]: (state, {pageLimit}) => {
        const currentPage = parseInt(state.currentPage + 1, 10);
        const nextItems = state.filteredItemsPaged.find( curr => curr.page === currentPage );
        if (! nextItems) {
            return state;
        }
        return {
            ...state,
            loading: false,
            visibleItemsPaged: [
                [...state.visibleItemsPaged,
                    nextItems
                ]
            ],
            visibleItems: [...state.visibleItems, ...nextItems.items],
            currentPage,
            pagesLeft: calculatePagesLeft(state.foundItemsCount, currentPage, pageLimit)
        };
    }
}, defaultsState);
