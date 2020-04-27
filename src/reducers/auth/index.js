import { LOG_IN_VALIDATING, SESSION_VALIDATING, SESSION_FOUND, SESSION_LOST, LOG_IN_SUCCESS, LOG_IN_FAILED } from "../../actions/auth";

export const initialAuth = {
    state: "",
    isLogIn: false,
    email: "",
    lastAccess: "",   
    error: "", 
};

export const auth = (state = initialAuth, action) => {    
    const {type, payload} = action;
    switch (type) {
        case SESSION_VALIDATING:
            {                                                  
                return {
                    state: !!payload.session ? SESSION_FOUND : SESSION_LOST,
                    isLogIn: !!payload.session,
                    ...payload.session
                }
            }
        case SESSION_LOST: 
            {                                
                return {
                    state: SESSION_LOST,
                    isLogIn: false,
                    error: payload.message                    
                }
            }
        case LOG_IN_VALIDATING:
            {                
                const result = {
                    state: !payload.error ? LOG_IN_SUCCESS : LOG_IN_FAILED,
                    isLogIn: !payload.error,
                    ...payload,                    
                };                
                return result;
            }    
        case LOG_IN_FAILED: 
            {
                return {
                    state: LOG_IN_FAILED,
                    isLogIn: false,
                    error: payload.message
                }
            }
        default:
            return state;
    }
}