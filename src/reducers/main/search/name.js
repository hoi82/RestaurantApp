import { READY_TO_LOAD, NAME_LOADING, NAME_LOADED, NAME_FAILED } from "../../../actions/main/search";

const initState = {
    status: READY_TO_LOAD,
    filter: [],
    error: ""
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case NAME_LOADING:
            return { status: NAME_LOADING, filter: state.filter, error: "" };
        case NAME_LOADED:
            return { status: NAME_LOADED, filter: payload, error: "" };
        case NAME_FAILED:
            return { status: NAME_FAILED, filter: state.filter, error: payload }
        default:
            return state;
    }
}