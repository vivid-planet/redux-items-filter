import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    setQuery as setQueryActionCreator,
    resetQuery as resetQueryActionCreator,
    changeItemsView as changeItemsViewActionCreator,
    toggleFilterController as toggleFilterControllerActionCreator,
    initialize as initializeActionCreator
} from '../actions/index';

import {
    getItems as getItemsActionCreator,
    getItemsNextPage as getItemsNextPageActionCreator
    // fetchItemsLocations as fetchItemsLocationsActionCreator,
    // fetchItemDetail as fetchItemDetailActionCreator,
} from '../actions/syncActions';


const mapStateToProps = (state, {name}) => {
    const itemsFilterState = state.itemsFilter[name];
    return {
        filterInitialized: itemsFilterState.filterInitialized,
        currentQuery: itemsFilterState.currentQuery,
        initialQuery: itemsFilterState.initialQuery,
        visibleItems: itemsFilterState.visibleItems,
        visibleItemsPaged: itemsFilterState.visibleItemsPaged,
        focusedItem: itemsFilterState.focusedItem.item,
        foundItemsCount: itemsFilterState.foundItemsCount,
        currentPage: itemsFilterState.currentPage,
        pagesLeft: itemsFilterState.pagesLeft,
        itemsView: itemsFilterState.itemsView,
        filterControllerVisible: itemsFilterState.filterControllerVisible
    };
};

const mapDispatchToProps = (dispatch, {name, filterCollectionReducer, pageLimit}) => {
    // const { location: { query } } = ownProps;
    const resetQuery = () => {
        dispatch(resetQueryActionCreator({filterName: name}));
    };
    return {
        initializeFilter: () => {
            dispatch(initializeActionCreator({filterName: name }));
        },
        setQuery: (query) => {
            dispatch(setQueryActionCreator({filterName: name, query}));
        },
        resetQuery: resetQuery,
        changeItemsView: (itemsView) => {
            dispatch(changeItemsViewActionCreator({filterName: name, itemsView}));
        },
        toggleFilterController: () => {
            dispatch(toggleFilterControllerActionCreator({filterName: name}));
        },
        getItems: () => {
            dispatch(getItemsActionCreator({filterName: name, filterCollectionReducer, pageLimit}));
        },
        getNextPage: () => {
            dispatch(getItemsNextPageActionCreator({filterName: name, pageLimit}));
        }
    };
};

function withSyncReduxState(WrappedComponent) {
    const WithSyncReduxState = connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
    WithSyncReduxState.propTypes = {
        name: PropTypes.string.isRequired,
        filterCollectionReducer: PropTypes.func.isRequired,
        pageLimit: PropTypes.number.isRequired
    };
    return WithSyncReduxState;
}

export default withSyncReduxState;
