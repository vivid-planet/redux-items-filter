import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isQueryEqual } from '../utils';
import { FORMAT_TO_QUERYSTRING } from '../queryFormatter';
import { PARSE_FROM_QUERYSTRING } from '../queryParser';

function withRouter(WrappedComponent) {
    class WithRouter extends Component {
        componentWillMount() {
            const { currentQuery, location: { search: locationSearch }, setQuery, queryParser } = this.props;
            // location from router overrides the initial query from state,
            if (!isQueryEqual(currentQuery, queryParser(locationSearch, {type: PARSE_FROM_QUERYSTRING}))) {
                setQuery(queryParser(locationSearch, {type: PARSE_FROM_QUERYSTRING}));
            }
        }
        componentDidUpdate(prevProps) {
            const { currentQuery, changeLocation, location: { search: locationSearch }, setQuery, queryParser } = this.props;
            const { currentQuery: oldQuery } = prevProps;
            // a change in the query was detected, we update the location in the router
            if (!isQueryEqual(oldQuery, currentQuery)) {
                changeLocation(currentQuery);
                // a change in the location was detected (back button), we update the query
            } else if (!isQueryEqual(oldQuery, queryParser(locationSearch, {type: PARSE_FROM_QUERYSTRING}))) {
                setQuery(queryParser(locationSearch, {type: PARSE_FROM_QUERYSTRING}));
            }
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithRouter.propTypes = {
        location: PropTypes.object.isRequired,
        currentQuery: PropTypes.object.isRequired,
        setQuery: PropTypes.func.isRequired,
        changeLocation: PropTypes.func.isRequired,
        queryParser: PropTypes.func.isRequired
    };

    WithRouter.displayName = 'ItemsFilterWithRouterHOC';

    const mapStateToProps = () => {
        return {
        };
    };

    const mapDispatchToProps = (dispatch, { queryFormatter, location: {pathname} }) => {
        return {
            changeLocation: (query) => {
                dispatch(push({
                    pathname,
                    search: `?${queryFormatter(query, {type: FORMAT_TO_QUERYSTRING})}`
                }));
            }
        };
    };
    const ConnectedWithRouter = connect(mapStateToProps, mapDispatchToProps)(WithRouter);

    ConnectedWithRouter.propTypes = {
        location: PropTypes.object.isRequired,
        queryFormatter: PropTypes.func.isRequired
    };
    return ConnectedWithRouter;
}
export default withRouter;
