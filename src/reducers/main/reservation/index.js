import { READY_RESERVATION, FETCHING_RESERVATION, RESERVATION_FETCHED, RESERVATION_FETCH_FAILED } from "../../../actions/main/reservation";
import { produce } from "immer";

const initState = {
    status: READY_RESERVATION,
    isPending: true,
    date: new Date(0),
    available: [],
    reserved: [],
    error: "",
    reservationID: ""            
}

export default (state = initState, action) => {    
    const {type, payload} = action;    
    switch (type) {        
        case FETCHING_RESERVATION:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
                draft.date = payload;                
                draft.error = "";
            });
        case RESERVATION_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.available = payload.available;
                draft.reserved = payload.reservations;
                draft.error = "";
            });
        case RESERVATION_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.available = [];
                draft.reserved = [];
                draft.error = payload;
            })
        default:
            return state;
    }
}