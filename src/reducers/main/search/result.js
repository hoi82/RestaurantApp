import { READY_TO_LOAD, RESULT_LOADING, RESULT_LOADED, RESULT_FAILED } from "../../../actions/main/search";
import { produce } from "immer";

const initState = {
    status: READY_TO_LOAD,
    result: [],
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RESULT_LOADING:
            return produce(state, draft => {
                Object.assign(draft, initState);
                draft.status = RESULT_LOADING;
            });
        case RESULT_LOADED:
            return produce(state, draft => {
                draft.status = RESULT_LOADED;
                draft.result = payload;
                draft.error = "";
            })            
        case RESULT_FAILED:
            return produce(state, draft => {
                draft.status = RESULT_FAILED;
                draft.error = payload;
            })                              
        default:
            return state;
    }
}