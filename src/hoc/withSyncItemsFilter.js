

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isQueryEqual } from '../utils';

function withSyncItemsFilter(WrappedComponent) {
    class SyncItemsFilter extends Component {
        componentWillMount() {
            const { initializeFilter } = this.props;
            initializeFilter();
        }
        componentDidMount() {
            const { getItems } = this.props;
            getItems();
        }
        componentDidUpdate(prevProps) {
            const { getItems, currentQuery } = this.props;
            const { currentQuery: oldQuery, filterInitialized } = prevProps;

            // make new calculation if a change in location detected and if in the previous state the filter instance is already initialized
            if (! isQueryEqual(currentQuery, oldQuery) && filterInitialized) {
                getItems();
            }
        }
        render() {
            return (
                <WrappedComponent  {...this.props}/>
            );
        }
    }

    SyncItemsFilter.propTypes = {
        initializeFilter: PropTypes.func.isRequired,
        getItems: PropTypes.func.isRequired,
        currentQuery: PropTypes.object.isRequired
    };

    SyncItemsFilter.defaultProps = {
        pageLimit: 12
    };

    SyncItemsFilter.displayName = 'SyncItemsFilterHOC';
    return SyncItemsFilter;
}

export default withSyncItemsFilter;
