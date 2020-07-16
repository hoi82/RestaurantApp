import { FETCHING_REVIEW, REVIEW_FETCHED, REVIEW_FETCH_FAILED } from "../../../actions/main/restaurant/review";
import produce from "immer";

const initState = {
    status: "",
    isPending: true,
    rating: 0, 
    title: "", 
    comment: "",
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCHING_REVIEW:            
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
            });
        case REVIEW_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.rating = payload.rating;
                draft.title = payload.title;            
                draft.comment = payload.comment;
                draft.error = "";
            });
        case REVIEW_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.error = payload;
            })
        default:
            return state;
    }
}