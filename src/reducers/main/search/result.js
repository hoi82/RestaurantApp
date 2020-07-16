import { READY_TO_LOAD, RESULT_LOADING, RESULT_LOADED, RESULT_FAILED } from "../../../actions/main/search";
import { produce } from "immer";

const initState = {
    status: READY_TO_LOAD,
    isPending: false,
    result: [],
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RESULT_LOADING:
            return produce(state, draft => {                                
                draft.status = RESULT_LOADING;
                draft.isPending = true;
            });
        case RESULT_LOADED:
            return produce(state, draft => {
                draft.status = RESULT_LOADED;
                draft.isPending = false;
                draft.result = payload;
                draft.error = "";
            })            
        case RESULT_FAILED:
            return produce(state, draft => {
                draft.status = RESULT_FAILED;
                draft.isPending = false;
                draft.error = payload;
            })                              
        default:
            return state;
    }
}