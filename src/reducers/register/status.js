import { REGISTER_FETCHING, REGISTER_FETCHED, REGISTER_FAILED } from "../../actions/register/status";

export const initialStatus = {
    status: "",
    info: null
}

export const status = (state = initialStatus, action) => {    
    const { type, paylord } = action;            
    switch (type) {        
        case REGISTER_FETCHING:
            return {
                status: REGISTER_FETCHING,
            }
        case REGISTER_FETCHED:
            {
                if (paylord.result) {
                    return {
                        status: REGISTER_FETCHED,
                        info: paylord
                    };
                }
                else {
                    return {
                        status: REGISTER_FAILED,
                        info: paylord
                    };
                }
            }
        case REGISTER_FAILED:                        
            return {
                status: REGISTER_FAILED,
                info: paylord
            };    
        default:
            return state;
    }
};