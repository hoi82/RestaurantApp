import axios from "axios";
import { axiosConfig, endpoint } from "../../../config/url";
import { showDialog } from "../../common/dialog";
import { DialogMode } from "../../../types/Variables";
import { push } from "connected-react-router";

export const READY_TO_LOAD_REVIEWS = "READY_TO_LOAD_REVIEWS";
export const LOADING_REVIEWS = "LOADING_REVIEWS";
export const REVIEWS_LOADED = "REVIEWS_LOADED";
export const FAIL_TO_LOAD_REVIEWS = "REVIEWS_LOADED";
export const REVIEW_UPLOADED = "REVIEW_UPLOADED";
export const REVIEW_EDITED = "REVIEW_EDITED";
export const REVIEW_REMOVED = "REVIEW_REMOVED";

const REVIEWS_URL = "http://localhost:3005/api/restaurant/:id/reviews";
const REVIEW_URL = "http://localhost:3005/api/review";

const shouldFetch = (getState, restaurantID, curPage) => {
    const { main : { restaurant: { reviews: {resid, status, page} } } } = getState();
    return (status == READY_TO_LOAD_REVIEWS) 
    || (status != LOADING_REVIEWS && resid != restaurantID)
    || (status != LOADING_REVIEWS && page != curPage);
}

export const fetchReviews = (id, page = 0, pageLength = 999) => (
    (dispatch) => {        
        dispatch({type: LOADING_REVIEWS, payload: {resid: id, page: page}});
        return axios.get(`${REVIEWS_URL.replace(":id", id)}?page=${page}&len=${pageLength}`, axiosConfig).then((res) => {            
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

export const uploadReview = (resid, review) => (dispatch) => {    
    return axios.post(REVIEW_URL, {resid, ...review}, axiosConfig).then((res) => {
        dispatch({type: REVIEW_UPLOADED, payload: res.data});
        dispatch(showDialog({
            mode: DialogMode.SUCCESS,
            content: "리뷰가 정상적으로 등록되었습니다.",
            onClose: () => dispatch(push(endpoint.restaurantDetail.replace(":id", resid)))
        }))
    }).catch((err) => {
        dispatch({type: FAIL_TO_LOAD_REVIEWS, payload: err});
    });
}

export const editReview = (resid, id, review) => (dispatch) => {
    return axios.put(`${REVIEW_URL}/${id}`, review, axiosConfig).then((res) => {
        dispatch({type: REVIEW_EDITED, payload: res.data});
        dispatch(showDialog({
            mode: DialogMode.SUCCESS,
            content: "리뷰가 정상적으로 수정되었습니다.",
            onClose: () => dispatch(push(endpoint.restaurantDetail.replace(":id", resid)))
        }));
    }).catch((err) => {
        dispatch({type: FAIL_TO_LOAD_REVIEWS, payload: err});
    })
}

export const deleteReview = (id) => (dispatch) => {    
    return axios.delete(`${REVIEW_URL}/${id}`, axiosConfig).then((res) => {
        dispatch({type: REVIEW_REMOVED, payload: res.data});
        dispatch(showDialog({
            mode: DialogMode.SUCCESS,
            content: "리뷰가 삭제되었습니다."
        }))
    })
}