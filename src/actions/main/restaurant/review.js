import Axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_REVIEW = "READY_TO_FETCH_REVIEW";
export const FETCHING_REVIEW = "FETCHING_REVIEW";
export const REVIEW_FETCHED = "REVIEW_FETCHED";
export const REVIEW_FETCH_FAILED = "REVIEW_FETCH_FAILED";

const REVIEW_URL = "http://localhost:3005/api/review"

export const fetchReview = (id) => async (dispatch) => {
    dispatch({type: FETCHING_REVIEW});
    try {
        const { data } = await Axios.get(`${REVIEW_URL}/${id}`, axiosConfig);
        if (data.error) {
            dispatch({type: REVIEW_FETCH_FAILED, payload: data.error.code});
        } 
        else {
            dispatch({type: REVIEW_FETCHED, payload: data});
        }        
    } catch (error) {
        if (error.response) {
            dispatch({type: REVIEW_FETCH_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: REVIEW_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }
}