import produce from "immer";

const { READY_TO_FETCH_MY_TAKEOUT, FETCHING_MY_TAKEOUT, MY_TAKEOUT_FETCHED, MY_TAKEOUT_FETCH_FAILED } = require("../../../actions/main/myTakeout");

const initState = {
    status: READY_TO_FETCH_MY_TAKEOUT,
    isPending: true,
    takeouts: [],
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCHING_MY_TAKEOUT:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
            })            
        case MY_TAKEOUT_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.takeouts = payload;
                draft.error = "";
            })
        case MY_TAKEOUT_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.error = payload;
            })
        default:
            return state;
    }
}