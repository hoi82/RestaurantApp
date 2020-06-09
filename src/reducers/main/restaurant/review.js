import { FETCHING_REVIEW, READY_TO_FETCH_REVIEW, REVIEW_UPLOADED, REVIEW_EDITED, REVIEW_FETCH_FAILED, RESET_REVIEW, SET_REVIEW, UPDATE_REVIEW_RATING, UPDATE_REVIEW_TITLE, UPDATE_REVIEW_COMMENT } from "../../../actions/main/restaurant/review";

const initState = {
    status: READY_TO_FETCH_REVIEW,
    id: "",
    resid: "",
    rating: 0,
    title: "",
    comment: "",
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCHING_REVIEW:
            return {
                status: type,
                resid: state.resid,
                rating: state.rating,
                title: state.title,
                comment: state.comment,
                error: state.error
            }
        case REVIEW_UPLOADED:
            return {
                status: type,
                resid: state.resid,
                rating: 0,
                title: "",
                comment: "",
                error: ""
            }
        case REVIEW_EDITED:
            return {
                status: type,
                resid: state.resid,
                rating: 0,
                title: "",
                comment: "",
                error: ""
            }
        case REVIEW_FETCH_FAILED:
            return {
                status: type,
                resid: state.resid,
                rating: state.rating,
                title: state.title,
                comment: state.comment,
                error: payload
            }
        case RESET_REVIEW:
            return {
                status: READY_TO_FETCH_REVIEW,
                resid: state.resid,
                rating: 0,
                title: "",
                comment: "",
                error: ""
            }
        case SET_REVIEW:
            return {
                status: READY_TO_FETCH_REVIEW,
                resid: payload.resid,
                id: payload.id,
                rating: payload.rating,
                title: payload.title,
                comment: payload.comment,
                error: ""
            }
        case UPDATE_REVIEW_RATING:
            return Object.assign({}, state, {rating: payload});
        case UPDATE_REVIEW_TITLE:
            return Object.assign({}, state, {title: payload});
        case UPDATE_REVIEW_COMMENT:
            return Object.assign({}, state, {comment: payload});
        default:
            return state;
    }
}