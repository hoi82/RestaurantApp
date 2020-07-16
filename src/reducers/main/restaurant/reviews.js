import { READY_TO_LOAD_REVIEWS, LOADING_REVIEWS, REVIEWS_LOADED, FAIL_TO_LOAD_REVIEWS } from "../../../actions/main/restaurant/reviews";
import produce from "immer";

const initState = {
    status: READY_TO_LOAD_REVIEWS,
    isPending: true,
    restaurantID: "",
    currentPage: 0,
    totalReviews: 0,
    reviewRating: "?",
    items: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOADING_REVIEWS:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
                draft.restaurantID = payload.resid;
                draft.currentPage = payload.page;
            });            
        case REVIEWS_LOADED:    
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.items = payload.reviews;
                draft.totalReviews = payload.totalReviews;
                draft.reviewRating = payload.reviewRating;
                draft.error = "";
            });                  
        case FAIL_TO_LOAD_REVIEWS:      
            return produce(state, draft => {
                draft.status = type;
                draft.items = [];
                draft.totalReviews = 0;
                draft.reviewRating = "?";
                draft.error = payload;
            })                  
        default:
            return state;
    }
}