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
    fetchItems as fetchItemsActionCreator,
    fetchItemsNextPage as fetchItemsNextPageActionCreator,
    fetchItemsLocations as fetchItemsLocationsActionCreator,
    fetchItemDetail as fetchItemDetailActionCreator
} from '../actions/asyncActions';

const mapStateToProps = (state, {name}) => {
    const itemsFilterState = state.itemsFilter[name];
    return {
        filterInitialized: itemsFilterState.filterInitialized,
        loading: itemsFilterState.loading,
        currentQuery: itemsFilterState.currentQuery,
        initialQuery: itemsFilterState.initialQuery,
        visibleItems: itemsFilterState.visibleItems,
        visibleItemsPaged: itemsFilterState.visibleItemsPaged,
        locationItems: itemsFilterState.locationItems.items,
        focusedItem: itemsFilterState.focusedItem.item,
        foundItemsCount: itemsFilterState.foundItemsCount,
        currentPage: itemsFilterState.currentPage,
        pagesLeft: itemsFilterState.pagesLeft,
        itemsView: itemsFilterState.itemsView,
        filterControllerVisible: itemsFilterState.filterControllerVisible
    };
};

const mapDispatchToProps = (dispatch, {name, resource, httpClient, pageLimit, queryFormatter, resourceLocations}) => {
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
        fetchItems: () => {
            dispatch(fetchItemsActionCreator({filterName: name, startTimeOfRequest: new Date(), resource, httpClient, pageLimit, queryFormatter}));
        },
        fetchNextPage: () => {
            dispatch(fetchItemsNextPageActionCreator( {filterName: name, startTimeOfRequest: new Date(), resource, httpClient, pageLimit, queryFormatter}));
        },
        fetchItemsLocations: () => {
            dispatch(fetchItemsLocationsActionCreator({filterName: name, startTimeOfRequest: new Date(), resourceLocations, httpClient, queryFormatter}));
        },
        fetchItemDetail: (id) => {
            dispatch(fetchItemDetailActionCreator({filterName: name, resource, httpClient, id}));
        },
        changeItemsView: (itemsView) => {
            dispatch(changeItemsViewActionCreator({filterName: name, itemsView}));
        },
        toggleFilterController: () => {
            dispatch(toggleFilterControllerActionCreator({filterName: name}));
        }
    };
};

function withAsyncReduxState(WrappedComponent) {
    const WithAsyncReduxState = connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
    WithAsyncReduxState.propTypes = {
        name: PropTypes.string.isRequired,
        resource: PropTypes.string.isRequired,
        httpClient: PropTypes.func.isRequired,
        pageLimit: PropTypes.number.isRequired,
        queryFormatter: PropTypes.func.queryFormatter,
        resourceLocations: PropTypes.string.isRequired
    };
    return WithAsyncReduxState;
}

export default withAsyncReduxState;
