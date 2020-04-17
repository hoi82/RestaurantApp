import axios from "axios";

export const SESSION_CHECK = "SESSION_CHECK";
export const LOG_IN = "LOG_IN";
export const AUTH_READY = "AUTH_READY";
export const AUTH_PROCESSING = "AUTH_PROCESSING";
export const AUTH_FINISHED = "AUTH_FINISHED";

const SESSION_URL = "http://localhost:3005/api/users/session/";
const LOG_IN_URL = "http://localhost:3005/api/users/login/";

const PostSessionCheck = (data) => {          
    return {
        type: SESSION_CHECK,        
        paylord: data
    }
}

export const SessionCheck = () => {
    return (dispatch) => {
        // dispatch(PostLogin(AUTH_PROCESSING));
        return axios.get(SESSION_URL, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {                        
            dispatch(PostSessionCheck(res.data));
        }).catch((err) => {
            
        });
    };    
};

const PostLogin = (data) => {        
    return {
        type: LOG_IN,        
        paylord: data
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
            dispatch(PostLogin(res.data));   
        }).catch((err) => {
            // throw(error);
        });               
    }        
}