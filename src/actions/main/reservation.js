import axios from "axios";
import { axiosConfig } from "../../config/url";
import { SESSION_FOUND } from "../auth";

export const READY_TO_REGISTER_RESERVATION = "READY_TO_REGISTER_RESERVATION";
export const PROCESSING_RESERVATION = "PROCESSING_RESERVATION";
export const RESERVATION_COMPLETE = "RESERVATION_COMPLETE";
export const RESERVATION_FAILED = "RESERVATION_FAILED";
export const UPDATE_RESERVATION_TIME = "UPDATE_RESERVATION_TIME";
export const UPDATE_RESERVATION_MEMBER = "UPDATE_RESERVATION_MEMBER";
export const UPDATE_RESERVATION_MESSAGE = "UPDATE_RESERVATION_MESSAGE";
export const READY_TO_FETCH_RESERVATION_LIST = "READY_TO_FETCH_RESERVATION_LIST";
export const FETCHING_RESERVATION_LIST = "FETCHING_RESERVATION_LIST";
export const RESERVATION_LIST_FETCHED = "RESERVATION_LIST_FETCHED";
export const RESERVATION_LIST_FETCH_FAILED = "RESERVATION_LIST_FETCH_FAILED";

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

export const registerReservation = (onComplete) => (dispatch, getState) => {
    const {auth, main} = getState();
    dispatch({ type: PROCESSING_RESERVATION });    
    if (auth.state == SESSION_FOUND) {
        const info = {
            resid: main.restaurant.details.id,
            userid: auth.id,
            start: main.reservation.start,
            end: main.reservation.end,
            member: main.reservation.member,
            message: main.reservation.message,
        };        
                
        return axios.post(RESERVATION_URL, info, axiosConfig).then((res) => {            
            dispatch({ type: RESERVATION_COMPLETE, payload: res.data });
            onComplete(RESERVATION_COMPLETE, res.data);
        }).catch((err) => {
            dispatch({ type: RESERVATION_FAILED, payload: err });
            onComplete(RESERVATION_FAILED, err);
        }); 
    }
    else {
        dispatch({ type: RESERVATION_FAILED, payload: "You must login first" });
        return { err: "You must login first" };
    }    
}

export const fetchReservation = (resid, date = new Date()) => (dispatch) => {        
    dispatch({type: FETCHING_RESERVATION_LIST, payload: date});
    axios.get(`${RESERVATION_URL}/${resid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, axiosConfig).then((res) => {        
        dispatch({type: RESERVATION_LIST_FETCHED, payload: res.data});
    }).catch((err) => {
        dispatch({type: RESERVATION_LIST_FETCH_FAILED, payload: err});
    })
}

export const fetchReservationIfNeed = (resid, date = new Date()) => (dispatch, getState) => {
    if (shouldFetch(getState, resid, date)) {
        return dispatch(fetchReservation(resid, date))
    }

    return null;
}

const shouldFetch = (getState, resid, date) => {
    const { reservation } = getState().main;    

    console.log(date);
    return ((date.toLocaleDateString() != reservation.date.toLocaleDateString()) ||
    reservation.reservedStatus == READY_TO_FETCH_RESERVATION_LIST);    
}