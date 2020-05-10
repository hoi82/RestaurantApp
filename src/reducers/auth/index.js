import { AUTH_PROCESSING, LOG_IN_FAILED, LOG_IN_SUCCESS, SESSION_FOUND, SESSION_LOST, LOGIN_VALIDATING, SESSION_VALIDATING, AUTH_READY } from "../../actions/auth";


export const initialAuth = {
    state: "",    
    email: "",
    lastAccess: new Date(0),
    error: "", 
};

export const auth = (state = initialAuth, action) => {    
    const {type, payload} = action;
    switch (type) {
        case AUTH_PROCESSING:
            {   
                return {
                    state: AUTH_PROCESSING,
                    email: state.email,
                    lastAccess: state.lastAccess,
                    error: "",
                }             
            }    
        case LOGIN_VALIDATING: 
            {
                if (payload.error) {
                    return {
                        state: LOG_IN_FAILED,
                        email: payload.email,
                        lastAccess: new Date(0),
                        error: payload.error
                    }
                }
                else {
                    if (payload.email) {
                        return {
                            state: LOG_IN_SUCCESS,
                            email: payload.email,
                            lastAccess: payload.lastAccess,
                            error: ""
                        }
                    }    
                    else {
                        return {
                            state: AUTH_READY,
                            email: "",
                            lastAccess: new Date(0),
                            error: ""
                        }
                    }                
                }
            }
        case SESSION_VALIDATING: 
            {
                if (payload.error) {
                    return {
                        state: SESSION_LOST,
                        email: "",
                        lastAccess: new Date(0),
                        error: payload.error
                    }
                }
                else {
                    if (payload.session) {
                        return {
                            state: SESSION_FOUND,
                            email: state.email,
                            lastAccess: state.lastAccess,
                            error: ""
                        }
                    }
                    else {
                        return {
                            state: SESSION_LOST,
                            email: "",
                            lastAccess: new Date(0),
                            error: ""
                        }
                    }
                }
            }
        default:
            return state;
    }
}