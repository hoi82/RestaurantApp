import axios from "axios";

export const READY_TO_FETCH_MY_RESERVATION = "READY_TO_FETCH_MY_RESERVATION";
export const FETCHING_MY_RESERVATION = "FETCHING_MY_RESERVATION";
export const MY_RESERVATION_FETCHED = "MY_RESERVATION_FETCHED";
export const MY_RESERVATION_FETCH_FAILED = "MY_RESERVATION_FETCH_FAILED";

const RESERVATION_URL = "http://localhost:3005/api/reservations";

export const fetchMyReservations = (userID) => async (dispatch) => {
    dispatch({type: FETCHING_MY_RESERVATION});
    try {
        const { data } = await axios.get(`${RESERVATION_URL}/${userID}`, axios);
        if (data.error) {
            dispatch({type: MY_RESERVATION_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: MY_RESERVATION_FETCHED, payload: data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: MY_RESERVATION_FETCH_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: MY_RESERVATION_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }
}