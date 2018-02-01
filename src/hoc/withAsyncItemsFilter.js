import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isQueryEqual } from '../utils';

function withAsyncItemsFilter(WrappedComponent) {
    class AsyncItemsFilter extends Component {
        componentWillMount() {
            const { initializeFilter } = this.props;
            initializeFilter();
        }
        componentDidMount() {
            const { fetchItems, fetchItemsLocations, resourceLocations } = this.props;
            fetchItems();
            resourceLocations && fetchItemsLocations();
        }
        componentDidUpdate(prevProps) {
            const { fetchItems, fetchItemsLocations, currentQuery, resourceLocations } = this.props;
            const { currentQuery: oldQuery, filterInitialized } = prevProps;
            // make new http requests if a change in location detected and if in the previous state the filter instance is already initialized
            if (! isQueryEqual(currentQuery, oldQuery) && filterInitialized) {
                fetchItems();
                resourceLocations && fetchItemsLocations();
            }
        }
        render() {
            return (
                <WrappedComponent  {...this.props}/>
            );
        }
    }

    AsyncItemsFilter.propTypes = {
        filterInitialized: PropTypes.bool.isRequired,
        initializeFilter: PropTypes.func.isRequired,
        fetchItems: PropTypes.func.isRequired,
        fetchItemsLocations: PropTypes.func.isRequired,
        resourceLocations: PropTypes.string,
        currentQuery: PropTypes.object.isRequired
    };

    AsyncItemsFilter.defaultProps = {
        pageLimit: 12
    };

    AsyncItemsFilter.displayName = 'AsyncItemsFilterHOC';
    return AsyncItemsFilter;
}

export default withAsyncItemsFilter;

