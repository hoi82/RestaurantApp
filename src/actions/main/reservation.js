import axios from "axios";
import { axiosConfig, endpoint } from "../../config/url";
import { push } from "connected-react-router";

export const READY_TO_REGISTER_RESERVATION = "READY_TO_REGISTER_RESERVATION";
export const PROCESSING_RESERVATION = "PROCESSING_RESERVATION";
export const RESERVATION_COMPLETE = "RESERVATION_COMPLETE";
export const UPDATE_RESERVATION_TIME = "UPDATE_RESERVATION_TIME";
export const UPDATE_RESERVATION_MEMBER = "UPDATE_RESERVATION_MEMBER";
export const UPDATE_RESERVATION_MESSAGE = "UPDATE_RESERVATION_MESSAGE";

export const READY_RESERVATION = "READY_RESERVATION";
export const FETCHING_RESERVATION = "FETCHING_RESERVATION";
export const RESERVATION_FETCHED = "RESERVATION_FETCHED";
export const RESERVATION_FETCH_FAILED = "RESERVATION_FETCH_FAILED";
export const REGISTERING_RESERVATION = "REGISTERING_RESERVATION";
export const RESERVAITON_SUCCESS = "RESERVAITON_REGISTERED";
export const RESERVATION_FAILED = "RESERVATION_FAILED";

const RESERVATION_URL = "http://localhost:3005/api/reservation";

export const registerReservation = (formInfo) => async (dispatch, getState) => {
    const {auth, main} = getState();
    dispatch({ type: PROCESSING_RESERVATION });    
    if (auth.isLogin) {
        const info = {
            resid: main.restaurant.details.id,
            userid: auth.id,
            name: formInfo.name,
            time: formInfo.time,            
            timezone: main.restaurant.details.opens.timezone,
            member: formInfo.member,
            message: formInfo.message,
        };           

        try {
            const { data } = await axios.post(RESERVATION_URL, info, axiosConfig);            
            if (data.error) {
                dispatch({ type: RESERVATION_FAILED, payload: data.error.code });
            }
            else {
                dispatch({ type: RESERVATION_COMPLETE, payload: data });                 
                dispatch(push(`${endpoint.restaurantReservationResult}/${data}`));
            }
        } catch (error) {
            if (error.response) {
                dispatch({ type: RESERVATION_FAILED, payload: error.response.status });   
            }
            else {
                dispatch({ type: RESERVATION_FAILED, payload: "NETWORK_ERROR" });
            }            
        }                    
    }
    else {
        dispatch({ type: RESERVATION_FAILED, payload: "NO_USER" });        
    }    
}

export const fetchReservation = (resid, date = new Date()) => async (dispatch, getState) => {
    dispatch({type: FETCHING_RESERVATION, payload: date});
    try {
        const { data } = await axios.get(`${RESERVATION_URL}/${resid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, axiosConfig);        
        if (data.error) {
            dispatch({type: RESERVATION_FETCH_FAILED, payload: data.error.code});
        }
        else {            
            dispatch({type: RESERVATION_FETCHED, payload: data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: RESERVATION_FETCH_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: RESERVATION_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }    
}