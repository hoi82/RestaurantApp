import { READY_TO_FETCH_TAKEOUTS, FETCHING_TAKEOUTS, TAKEOUTS_FETCHED, TAKEOUTS_FETCH_FAILED } from "../../../actions/main/takeout"
import produce from "immer";

const initState = {
    status: READY_TO_FETCH_TAKEOUTS,
    isPending: true,
    resid: "",
    list: [],
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCHING_TAKEOUTS:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
                draft.id = payload;                
            });
        case TAKEOUTS_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.list = payload;
                draft.error = "";
            })            
        case TAKEOUTS_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.list = [];
                draft.error = payload;
            })    
        default:
            return state;
    }
}