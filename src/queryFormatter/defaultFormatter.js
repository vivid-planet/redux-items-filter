import { FORMAT_TO_QUERYSTRING, FORMAT_TO_REDUX_FORM, FORMAT_TO_REST_QUERYSTRING } from '.';
import queryString from 'query-string';

export default (query, action) => {
    switch( action.type ) {
        case FORMAT_TO_QUERYSTRING:
        case FORMAT_TO_REST_QUERYSTRING:
            return ( typeof query !== 'string') ? queryString.stringify(query) : query;
        case FORMAT_TO_REDUX_FORM:
        default:
            return query;
    }
}
