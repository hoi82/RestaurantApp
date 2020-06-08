import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_REVIEW = "READY_TO_FETCH_REVIEW";
export const FETCHING_REVIEW = "FETCHING_REVIEW";
export const REVIEW_UPLOADED = "REVIEW_UPLOADED";
export const REVIEW_EDITED = "REVIEW_EDITED";
export const REVIEW_FETCH_FAILED = "REVIEW_FETCH_FAILED";
export const UPDATE_REVIEW_RATING = "UPDATE_REVIEW_RATING";
export const UPDATE_REVIEW_TITLE = "UPDATE_REVIEW_TITLE";
export const UPDATE_REVIEW_COMMENT = "UPDATE_REVIEW_COMMENT";
export const SET_REVIEW = "SET_REVIEW";
export const RESET_REVIEW = "RESET_REVIEW";

const REVIEW_URL = "http://localhost:3005/api/review";

export const uploadReview = (restaurantID) => (dispatch, getState) => {
    const { review } = getState().main.restaurant;        

    dispatch({type: FETCHING_REVIEW});
    return axios.patch(REVIEW_URL, {
        resId: restaurantID,
        rating: review.rating,
        title: review.title,
        comment: review.comment
    }, axiosConfig).then((res) => {
        dispatch({type: REVIEW_UPLOADED});
    }).catch((err) => {
        dispatch({type: REVIEW_FETCH_FAILED, payload: err});
    })
}

export const editReview = () => (dispatch, getState) => {
    return axios.post(REVIEW_URL, {
        resId: review.resid,
        rating: review.rating,
        title: review.title,
        comment: review.comment
    }, axiosConfig).then((res) => {
        dispatch({type: REVIEW_EDITED});
    }).catch((err) => {
        dispatch({type: REVIEW_FETCH_FAILED, payload: err})
    })
}

export const initReview = () => {
    return {type: RESET_REVIEW};
}

export const setReview = (review) => {
    return {type: SET_REVIEW, payload: review};
}

export const updateRating = (value) => {
    return {type: UPDATE_REVIEW_RATING, payload: value};
}

export const updateTitle = (value) => {
    return {type: UPDATE_REVIEW_TITLE, payload: value};
}

export const updateComment = (value) => {
    return {type: UPDATE_REVIEW_COMMENT, payload: value};
}