import asyncItemsFilterReducer, {defaultsState as asyncItemsFilterDefaultsState} from './asyncItemsFilter';

const createAsyncItemsFilterReducer = (initialState = {}) => {
    const mergedInitialState = {};
    for (const property in initialState) {
        if (initialState.hasOwnProperty(property)) {
            mergedInitialState[property] = {...asyncItemsFilterDefaultsState, ...initialState[property]};
        }
    }
    return (state = mergedInitialState, action) => {
        let filterName = null;

        if (action.filterName) {
            filterName = action.filterName;
        }
        if (action.payload && action.payload.filterName) {
            filterName = action.payload.filterName;
        }
        if (action.payload && action.payload.request && action.payload.request[0] && action.payload.request[0].filterName) {
            filterName = action.payload.request[0].filterName;
        }
        if (filterName) {
            return {...state, [filterName]: asyncItemsFilterReducer(state[filterName], action)};
        }
        return state;
    };
};

export default createAsyncItemsFilterReducer;
