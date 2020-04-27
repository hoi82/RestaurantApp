import { REGISTER_FETCHING, REGISTER_FETCHED, REGISTER_FAILED, RESET_REGISTER_STATUS } from "../../actions/register/status";

export const initialStatus = {
    status: "",
    info: null
}

export const status = (state = initialStatus, action) => {    
    const { type, payload } = action;            
    switch (type) {        
        case REGISTER_FETCHING:
            return {
                status: REGISTER_FETCHING,
            }
        case REGISTER_FETCHED:
            {
                if (payload.result) {
                    return {
                        status: REGISTER_FETCHED,
                        info: payload
                    };
                }
                else {
                    return {
                        status: REGISTER_FAILED,
                        info: payload
                    };
                }
            }
        case REGISTER_FAILED:                        
            return {
                status: REGISTER_FAILED,
                info: payload
            };   
        case RESET_REGISTER_STATUS:            
            return initialStatus;
        default:
            return state;
    }
};