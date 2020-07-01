import axios from "axios";
import { axiosConfig, endpoint } from "../../config/url";
import { SESSION_FOUND, LOG_IN_SUCCESS } from "../auth";
import { push } from "connected-react-router";

export const READY_TO_REGISTER_RESERVATION = "READY_TO_REGISTER_RESERVATION";
export const PROCESSING_RESERVATION = "PROCESSING_RESERVATION";
export const RESERVATION_COMPLETE = "RESERVATION_COMPLETE";
export const RESERVATION_FAILED = "RESERVATION_FAILED";
export const UPDATE_RESERVATION_TIME = "UPDATE_RESERVATION_TIME";
export const UPDATE_RESERVATION_MEMBER = "UPDATE_RESERVATION_MEMBER";
export const UPDATE_RESERVATION_MESSAGE = "UPDATE_RESERVATION_MESSAGE";

const RESERVATION_URL = "http://localhost:3005/api/reservation";

export const updateTime = (time = {start: null, end: null}) => {    
    return {type: UPDATE_RESERVATION_TIME, payload: time};
}

export const updateMember = (count = 0) => {
    return {type: UPDATE_RESERVATION_MEMBER, payload: count};
}

export const updateMessage = (message = "") => {
    return {type: UPDATE_RESERVATION_MESSAGE, payload: message};
}

export const registerReservation = () => (dispatch, getState) => {
    const {auth, main} = getState();
    dispatch({ type: PROCESSING_RESERVATION });    
    if (auth.state == SESSION_FOUND || auth.state == LOG_IN_SUCCESS) {
        const info = {
            resid: main.restaurant.details.id,
            userid: auth.id,
            start: main.reservation.start,
            end: main.reservation.end,
            timezone: main.restaurant.details.opens.timezone,
            member: main.reservation.member,
            message: main.reservation.message,
        };        
                
        return axios.post(RESERVATION_URL, info, axiosConfig).then((res) => {            
            dispatch({ type: RESERVATION_COMPLETE, payload: res.data });            
            dispatch(push(`${endpoint.restaurantReservationResult}/${res.data}`));
        }).catch((err) => {
            dispatch({ type: RESERVATION_FAILED, payload: err });            
        }); 
    }
    else {
        dispatch({ type: RESERVATION_FAILED, payload: "You must login first" });
        return { err: "You must login first" };
    }    
}