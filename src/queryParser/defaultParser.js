import { PARSE_FROM_QUERYSTRING, PARSE_FROM_REDUX_FORM } from '.';
import queryString from 'query-string';

export default (queryData, action) => {
    switch( action.type ) {
        case PARSE_FROM_QUERYSTRING:
            return ( typeof queryData === 'string') ? queryString.parse(queryData) : queryData;
        case PARSE_FROM_REDUX_FORM:
        default:
            return queryData;
    }
}
