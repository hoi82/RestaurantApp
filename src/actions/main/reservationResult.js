import Axios from "axios";
import { axiosConfig } from "../../config/url";

export const READY_TO_FETCH_RESERVATION_RESULT = "READY_TO_FETCH_RESERVATION_RESULT";
export const FETCHING_RESERVATION_RESULT = "FETCHING_RESERVATION_RESULT";
export const RESERVATION_RESULT_FETCHED = "RESERVATION_RESULT_FETCHED";
export const RESERVATION_RESULT_FETCH_FAILED = "RESERVATION_RESULT_FETCH_FAILED";

const RESERVATION_URL = "http://localhost:3005/api/reservation";

export const fetchReservationResult = (id) => async (dispatch) => {
    dispatch({type: FETCHING_RESERVATION_RESULT, payload: id});
    try {
        const { data } = await Axios.get(`${RESERVATION_URL}/${id}`, axiosConfig);        
        if (data.error) {
            dispatch({type: RESERVATION_RESULT_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: RESERVATION_RESULT_FETCHED, payload: data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: RESERVATION_RESULT_FETCH_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: RESERVATION_RESULT_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }
}