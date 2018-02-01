import syncItemsFilterReducer, {defaultsState as syncItemsFilterDefaultsState} from './syncItemsFilter';

const createSyncItemsFilterReducer = (initialState = {}) => {
    const mergedInitialState = {};
    for (const property in initialState) {
        if (initialState.hasOwnProperty(property)) {
            mergedInitialState[property] = {...syncItemsFilterDefaultsState, ...initialState[property]};
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
        if (filterName) {
            return {...state, [filterName]: syncItemsFilterReducer(state[filterName], action)};
        }
        return state;
    };
};

export default createSyncItemsFilterReducer;
