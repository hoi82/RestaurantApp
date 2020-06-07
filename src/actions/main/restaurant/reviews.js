import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_LOAD_REVIEWS = "READY_TO_LOAD_REVIEWS";
export const LOADING_REVIEWS = "LOADING_REVIEWS";
export const REVIEWS_LOADED = "REVIEWS_LOADED";
export const FAIL_TO_LOAD_REVIEWS = "REVIEWS_LOADED";

const REVIEW_URL = "http://localhost:3005/api/restaurant/:id/reviews";

const shouldFetch = (getState, resid, page) => {
    const { main } = getState();
    return (main.restaurant.reviews.status == READY_TO_LOAD_REVIEWS) 
    || (main.restaurant.reviews.resid != resid)
    || (main.restaurant.reviews.page != page);
}

export const fetchReviews = (id, page = 0, pageLength = 999) => (
    (dispatch) => {        
        dispatch({type: LOADING_REVIEWS, payload: {resid: id, page: page}});
        return axios.get(`${REVIEW_URL.replace(":id", id)}?page=${page}&len=${pageLength}`, axiosConfig).then((res) => {            
            dispatch({type: REVIEWS_LOADED, payload: res.data});
        }).catch((err) => {
            dispatch({type: FAIL_TO_LOAD_REVIEWS, payload: err});
        })
    }
)

export const fetchReviewsIfNeed = (id, page = 0, pageLength = 999) => (
    (dispatch, getState) => {
        if (shouldFetch(getState)) {
            return dispatch(fetchReviews(id, page, pageLength));
        }

        return null;
    }
)