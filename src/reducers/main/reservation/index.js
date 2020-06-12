import { UPDATE_RESERVATION_TIME, UPDATE_RESERVATION_MEMBER, UPDATE_RESERVATION_MESSAGE, READY_TO_REGISTER_RESERVATION, PROCESSING_RESERVATION, RESERVATION_COMPLETE, RESERVATION_FAILED } from "../../../actions/main/reservation";
import { produce } from "immer";

const initState = {
    status: READY_TO_REGISTER_RESERVATION,    
    start: null,
    end: null,
    member: 0,
    message: "",    
    error: "",        
}

export default (state = initState, action) => {    
    const {type, payload} = action;    
    switch (type) {
        case UPDATE_RESERVATION_TIME:
            return produce(state, draft => {
                draft.start = payload.start;
                draft.end = payload.end;
            })                  
        case UPDATE_RESERVATION_MEMBER:
            return produce(state, draft => {
                draft.member = payload;
            })            
        case UPDATE_RESERVATION_MESSAGE:
            return produce(state, draft => {
                draft.message = payload;
            })            

        // Reservation to Server
        case PROCESSING_RESERVATION:            
            return produce(state, draft => {
                draft.status = type;
                draft.sessionID = null;
            })
        case RESERVATION_COMPLETE:
            return produce(state, draft => {
                draft.status = READY_TO_REGISTER_RESERVATION;                                
                draft.start = null;
                draft.end = null;
                draft.member = 0;
                draft.message = "";
                draft.error = "";
            })                       
        case RESERVATION_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.error = payload;                
            })                            
        default:
            return state;
    }
}