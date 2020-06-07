import { READY_TO_LOAD_REVIEWS, LOADING_REVIEWS, REVIEWS_LOADED, FAIL_TO_LOAD_REVIEWS } from "../../../actions/main/restaurant/reviews";

const initState = {
    status: READY_TO_LOAD_REVIEWS,
    resid: "",
    page: 0,
    totalReviews: "0",
    reviewRating: "?",
    items: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOADING_REVIEWS:
            return {
                status: type,
                resid: payload.resid,
                page: payload.page,
                items: state.items,
                totalReviews: state.totalReviews,
                reviewRating: state.reviewRating,
                error: ""
            }
        case REVIEWS_LOADED:
            return {
                status: type,
                resid: state.resid,
                page: state.page,
                items: payload.reviews,
                totalReviews: payload.totalReviews,
                reviewRating: payload.reviewRating,
                error: ""
            }
        case FAIL_TO_LOAD_REVIEWS:
            return {
                status: type,
                resid: state.resid,
                page: state.page,
                items: [],
                totalReviews: "0",
                reviewRating: "?",
                error: payload
            }    
        default:
            return state;
    }
}