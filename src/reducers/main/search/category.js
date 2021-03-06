import { READY_TO_LOAD, CATEGORY_LOADING, CATEGORY_LOADED, CATEGORY_FAILED } from "../../../actions/main/search";
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
        case CATEGORY_LOADING:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;                
            });            
        case CATEGORY_LOADED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.filter = payload;
                draft.error = "";
            });            
        case CATEGORY_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.error = payload;
            });            
        default:
            return state;
    }
}