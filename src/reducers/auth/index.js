import { produce } from "immer";
import { AUTH_PROCESSING, LOG_IN_FAILED, LOG_IN_SUCCESS, SESSION_FOUND, SESSION_LOST, LOGIN_VALIDATING, SESSION_VALIDATING, AUTH_READY, RESET_AUTH, LOG_OUT } from "../../actions/auth";


export const initialAuth = {    
    state: "",    
    id: "",
    email: "",
    name: "",
    lastAccess: new Date(0),
    error: 0
};

export const auth = (state = initialAuth, action) => {    
    const {type, payload} = action;
    switch (type) {
        case AUTH_PROCESSING:              
            return produce(state, draft => {                
                draft.state = state.state;
                draft.error = 0;
            });            
        case LOG_IN_SUCCESS:
            return produce(state, draft => {
                draft.state = LOG_IN_SUCCESS;
                draft.email = payload.email;
                draft.name = payload.name;
                draft.lastAccess = Date.parse(payload.lastAccess);
                draft.error = 200;
            });
        case LOG_IN_FAILED:
            return produce(state, draft => {
                draft.state = LOG_IN_FAILED;
                draft.email = "";
                draft.name = "";
                draft.lastAccess = new Date(0),
                draft.error = payload.code;
            });
        case LOG_OUT:
            return produce(state, draft => {
                draft.state = SESSION_LOST;
                draft.email = "";
                draft.name = "";
                draft.lastAccess = new Date(0),
                draft.error = 0;
            })
        case SESSION_VALIDATING: 
            {
                if (payload.error) {
                    return {
                        state: SESSION_LOST,
                        id: "",
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
                            id: payload.id,
                            email: payload.email,
                            name: payload.name,
                            lastAccess: state.lastAccess,
                            error: ""
                        }
                    }
                    else {
                        return {
                            state: SESSION_LOST,
                            id: "",
                            email: "",
                            name: "",
                            lastAccess: new Date(0),
                            error: ""
                        }
                    }
                }
            }
        case RESET_AUTH:
            return produce(state, draft => {
                Object.assign(draft, initialAuth);
            });
        default:
            return state;
    }
}