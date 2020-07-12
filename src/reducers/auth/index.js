import { produce } from "immer";
import { AUTH_PROCESSING, LOG_IN_FAILED, LOG_IN_SUCCESS, SESSION_FOUND, SESSION_LOST, LOGIN_VALIDATING, SESSION_VALIDATING, AUTH_READY, RESET_AUTH, LOG_OUT } from "../../actions/auth";


export const initialAuth = {    
    status: AUTH_READY,
    isLogin: false,    
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
                draft.status = state.status;
                draft.error = 0;
            });            
        case LOG_IN_SUCCESS:
            return produce(state, draft => {
                draft.status = LOG_IN_SUCCESS;
                draft.isLogin = true;
                draft.id = payload.id;
                draft.email = payload.email;
                draft.name = payload.name;
                draft.lastAccess = Date.parse(payload.lastAccess);
                draft.error = 200;
            });
        case LOG_IN_FAILED:
            return produce(state, draft => {                
                draft.status = LOG_IN_FAILED;
                draft.isLogin = false;
                draft.id = "";
                draft.email = "";
                draft.name = "";
                draft.lastAccess = new Date(0),
                draft.error = payload;
            });            
        case LOG_OUT:
            return produce(state, draft => {
                draft.status = SESSION_LOST;
                draft.isLogin = false;
                draft.id = "";
                draft.email = "";
                draft.name = "";
                draft.lastAccess = new Date(0),
                draft.error = 0;
            })
        case SESSION_FOUND:
            return produce(state, draft => {
                draft.status = type;
                draft.isLogin = true;
                draft.id = payload.id;
                draft.email = payload.email;
                draft.name = payload.name;
                draft.lastAccess = payload.lastAccess;
                draft.error = 0;
            })
        case SESSION_LOST:
            return produce(state, draft => {
                draft.status = type;
                draft.isLogin = false;
                draft.id = "";
                draft.email = "";
                draft.name = "";
                draft.lastAccess = new Date(0);
                draft.error = 0;
            })        
        case RESET_AUTH:
            return produce(state, draft => {
                Object.assign(draft, initialAuth);
            });
        default:
            return state;
    }
}