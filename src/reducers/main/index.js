import initState from "../../stores/main";
import { SEARCH_RESTAURANT_BY_NAME, GET_ALL_CATEGORIES, DATA_LOADING, DATA_LOADED } from "../../actions/main";

export const main = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DATA_LOADING: 
            return Object.assign({}, state, { status: Object.assign({}, state.status, payload) });
        case DATA_LOADED:            
            return Object.assign({}, state, { status: Object.assign({}, state.status, payload[0]) }, { search: Object.assign({}, state.search, payload[1]) });
        case SEARCH_RESTAURANT_BY_NAME:
            return Object.assign({}, state, { searchResults: JSON.parse(payload) });            
        default:
            return state;
    }
}