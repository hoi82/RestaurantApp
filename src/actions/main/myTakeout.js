import axios from "axios";

export const READY_TO_FETCH_MY_TAKEOUT = "READY_TO_FETCH_MY_TAKEOUT";
export const FETCHING_MY_TAKEOUT = "FETCHING_MY_TAKEOUT";
export const MY_TAKEOUT_FETCHED = "MY_TAKEOUT_FETCHED";
export const MY_TAKEOUT_FETCH_FAILED = "MY_TAKEOUT_FETCH_FAILED";

const TAKEOUT_URL = "http://localhost:3005/api/takeouts";

export const fetchMyTakeouts = (userID) => async (dispatch) => {
    dispatch({type: FETCHING_MY_TAKEOUT});
    try {
        const { data } = await axios.get(`${TAKEOUT_URL}/${userID}`, axios);
        if (data.error) {
            dispatch({type: MY_TAKEOUT_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: MY_TAKEOUT_FETCHED, payload: data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: MY_TAKEOUT_FETCH_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: MY_TAKEOUT_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }
}