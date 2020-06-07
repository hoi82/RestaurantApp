import axios from "axios";
import { axiosConfig } from "../../config/url";

export const AUTH_READY = "AUTH_READY";
export const AUTH_PROCESSING = "AUTH_PROCESSING";
export const LOGIN_VALIDATING = "LOGIN_VALIDATING";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const SESSION_VALIDATING = "SESSION_VALIDATING";
export const SESSION_FOUND = "SESSION_FOUND";
export const SESSION_LOST = "SESSION_LOST";
export const RESET_AUTH = "RESET_AUTH";

const SESSION_URL = "http://localhost:3005/api/users/session/";
const LOG_IN_URL = "http://localhost:3005/api/users/login/";
const LOG_OUT_URL = "http://localhost:3005/api/users/logout/";

export const SessionCheck = () => {    
    return (dispatch) => {    
        dispatch({type: AUTH_PROCESSING});            
        return axios.get(SESSION_URL, axiosConfig).then((res) => {    
            setTimeout(() => {
                dispatch({ type: SESSION_VALIDATING, payload: res.data });
            }, 300);                                
        }).catch((err) => {
            dispatch({ type: SESSION_VALIDATING, payload: { error: err } });
        });
    };    
};

export const LogIn = (email, password) => {           
    return (dispatch) => {        
        dispatch({type: AUTH_PROCESSING});
        return axios.post(LOG_IN_URL, 
            {
                email: email,
                password: password
            },
            axiosConfig).then((res) => {            
            dispatch({ type: LOGIN_VALIDATING, payload: res.data }); 
        }).catch((err) => {                      
            dispatch({ type: LOGIN_VALIDATING, payload: { email: email, error: err }});
        });                       
    }        
}

export const LogOut = () => {
    return (dispatch) => {
        dispatch({type: AUTH_PROCESSING});
        return axios.post(LOG_OUT_URL, axiosConfig).then((res) => {
            dispatch({ type: LOGIN_VALIDATING, payload: res.data }); 
        }).catch((err) => {
            dispatch({ type: LOGIN_VALIDATING, payload: { error: err }});
        });   
    }
}

export const resetAuth = () => {
    return {
        type: RESET_AUTH
    }
}