import { AUTH_PROCESSING, LOG_IN_FAILED, LOG_IN_SUCCESS, SESSION_FOUND, SESSION_LOST, LOGIN_VALIDATING, SESSION_VALIDATING, AUTH_READY, RESET_AUTH } from "../../actions/auth";


export const initialAuth = {
    state: "",    
    email: "",
    name: "",
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
                    name: state.name,
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
                        name: payload.name,
                        lastAccess: new Date(0),
                        error: payload.error
                    }
                }
                else {
                    if (payload.email) {
                        return {
                            state: LOG_IN_SUCCESS,
                            email: payload.email,
                            name: payload.name,
                            lastAccess: payload.lastAccess,
                            error: ""
                        }
                    }    
                    else {
                        return {
                            state: AUTH_READY,
                            email: "",
                            name: "",
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
                        name: "",
                        lastAccess: new Date(0),
                        error: payload.error
                    }
                }
                else {
                    if (payload.session) {
                        return {
                            state: SESSION_FOUND,
                            email: payload.email,
                            name: payload.name,
                            lastAccess: state.lastAccess,
                            error: ""
                        }
                    }
                    else {
                        return {
                            state: SESSION_LOST,
                            email: "",
                            name: "",
                            lastAccess: new Date(0),
                            error: ""
                        }
                    }
                }
            }
        case RESET_AUTH:
            return initialAuth;
        default:
            return state;
    }
}