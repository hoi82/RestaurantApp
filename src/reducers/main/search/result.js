import { READY_TO_LOAD, RESULT_LOADING, RESULT_LOADED, RESULT_FAILED, RESULT_RESET } from "../../../actions/main/search"

const initState = {
    status: READY_TO_LOAD,
    result: [],
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RESULT_LOADING:
            return { status: RESULT_LOADING, result: state.result, error: "" };
        case RESULT_LOADED:
            return { status: RESULT_LOADED, result: payload, error: "" };
        case RESULT_FAILED:
            return { status: RESULT_FAILED, result: state.result, error: payload };
        case RESULT_RESET:
            return { status: READY_TO_LOAD, result: [], error: "" };
        default:
            return state;
    }
}