import axios from "axios";
import { axiosConfig } from "../../config/url";

export const AUTH_READY = "AUTH_READY";
export const AUTH_PROCESSING = "AUTH_PROCESSING";
export const LOGIN_VALIDATING = "LOGIN_VALIDATING";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const LOG_OUT = "LOG_OUT";
export const SESSION_VALIDATING = "SESSION_VALIDATING";
export const SESSION_FOUND = "SESSION_FOUND";
export const SESSION_LOST = "SESSION_LOST";
export const RESET_AUTH = "RESET_AUTH";

const SESSION_URL = "http://localhost:3005/api/users/session/";
const LOG_IN_URL = "http://localhost:3005/api/users/login/";
const LOG_OUT_URL = "http://localhost:3005/api/users/logout/";

export const SessionCheck = () => async (dispatch) => {    
    dispatch({type: AUTH_PROCESSING});
    try {
        const { data } = await axios.get(SESSION_URL, axiosConfig);
        if (data.session) {
            dispatch({type: SESSION_FOUND, payload: data});
        }
        else {
            dispatch({type: SESSION_LOST, payload: data});
        }            
    } catch (error) {
        if (error.response) {
            dispatch({ type: SESSION_LOST, payload: error.response.status });
        }        
        else {
            dispatch({ type: SESSION_LOST, payload: "NETWORK_ERROR" });
        }
    }            
};

export const SessionCheckIfNeed = () => (dispatch, getState) => {
    const { auth: {state} } = getState();    
    if (state == AUTH_READY) {              
        return dispatch(SessionCheck());
    }    
    return new Promise((resolve, reject) => {
        resolve(null);
    });
}

export const processLogIn = (email, password) => {
    return async (dispatch) => {        
        dispatch({type: AUTH_PROCESSING});
        try {
            const { data } = await axios.post(LOG_IN_URL, {
                email: email,
                password: password
            }, axiosConfig);

            if (data.error) {
                dispatch({type: LOG_IN_FAILED, payload: data.error.code});
            }
            else {
                dispatch({type: LOG_IN_SUCCESS, payload: data});
            }            
        } catch (error) {
            if (error.response) {
                dispatch({type: LOG_IN_FAILED, payload: error.response.status});
            }
            else {
                dispatch({type: LOG_IN_FAILED, payload: "NETWORK_ERROR"});
            }
        }        
    }
}

export const LogOut = () => async (dispatch) => {
    dispatch({type: AUTH_PROCESSING});
    try {
        const { data } = await axios.get(LOG_OUT_URL, axiosConfig);        
        dispatch({ type: LOG_OUT, payload: res.data }); 
    } catch (error) {
        if (error.response) {
            dispatch({type: LOG_IN_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: LOG_IN_FAILED, payload: "NETWORK_ERROR"});
        }
    }    
}