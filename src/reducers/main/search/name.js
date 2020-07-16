import { READY_TO_LOAD, NAME_LOADING, NAME_LOADED, NAME_FAILED } from "../../../actions/main/search";
import produce from "immer";

const initState = {
    status: READY_TO_LOAD,
    isPending: true,
    filter: [],
    error: ""
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case NAME_LOADING:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;                                
            })            
        case NAME_LOADED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.filter = payload;
                draft.error = "";
            })            
        case NAME_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.error = payload;
            })            
        default:
            return state;
    }
}