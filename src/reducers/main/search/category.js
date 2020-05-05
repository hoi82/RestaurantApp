import { READY_TO_LOAD, CATEGORY_LOADING, CATEGORY_LOADED, CATEGORY_FAILED } from "../../../actions/main/search";

const initState = {
    status: READY_TO_LOAD,
    filter: [],
    error: ""
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORY_LOADING:
            return { status: CATEGORY_LOADING, filter: state.filter, error: "" };
        case CATEGORY_LOADED:
            return { status: CATEGORY_LOADED, filter: payload, error: "" };
        case CATEGORY_FAILED:
            return { status: CATEGORY_FAILED, filter: state.filter, error: payload }
        default:
            return state;
    }
}