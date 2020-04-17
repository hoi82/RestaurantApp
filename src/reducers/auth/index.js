import { SESSION_CHECK, LOG_IN } from "../../actions/auth";

export const initialAuth = {
    isLogIn: false,
    email: "",
    lastAccess: "",    
};

export const auth = (state = initialAuth, action) => {    
    const type = action.type;       
    switch (type) {
        case SESSION_CHECK:
            {                              
                return {
                    isLogIn: !!action.paylord.session,
                    ...action.paylord.session
                }
            }
        case LOG_IN:
            {                
                const result = {
                    isLogIn: !action.paylord.error,
                    ...action.paylord,                    
                };                
                return result;
            }    
        default:
            return state;
    }
}