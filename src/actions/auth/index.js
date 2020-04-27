import axios from "axios";

export const LOG_IN_READY = "LOG_IN_READY";
export const LOG_IN_VALIDATING = "LOG_IN_VALIDATING";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const SESSION_CHECK_READY = "SESSION_CHECK_READY";
export const SESSION_VALIDATING = "SESSION_VALIDATING";
export const SESSION_FOUND = "SESSION_FOUND";
export const SESSION_LOST = "SESSION_LOST";

const SESSION_URL = "http://localhost:3005/api/users/session/";
const LOG_IN_URL = "http://localhost:3005/api/users/login/";
const LOG_OUT_URL = "http://localhost:3005/api/users/logout/";

export const SessionCheck = () => {
    return (dispatch) => {                
        return axios.get(SESSION_URL, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {    
            setTimeout(() => {
                dispatch({ type: SESSION_VALIDATING, payload: res.data });
            }, 300);                                
        }).catch((err) => {
            dispatch({ type: SESSION_LOST, payload: err });
        });
    };    
};

export const LogIn = (email, password) => {       
    return (dispatch) => {
        return axios.post(LOG_IN_URL, 
            {
                email: email,
                password: password
            },
            {
                headers: {                
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                withCredentials: true,            
        }).then((res) => {
            dispatch({ type: LOG_IN_VALIDATING, payload: res.data }); 
        }).catch((err) => {
            dispatch({ type: LOG_IN_FAILED, payload: err});
        });               
    }        
}

export const LogOut = (email, password) => {
    return (dispatch) => {
        return axios.post(LOG_OUT_URL, 
            {
                email: email,                
            },
            {
                headers: {                
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                withCredentials: true,            
        }).then((res) => {
            dispatch({ type: LOG_IN_VALIDATING, payload: res.data }); 
        }).catch((err) => {
            dispatch({ type: LOG_IN_FAILED, payload: err});
        });   
    }
}