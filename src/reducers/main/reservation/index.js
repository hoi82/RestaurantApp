import { READY_RESERVATION, FETCHING_RESERVATION, RESERVATION_FETCHED, RESERVATION_FETCH_FAILED } from "../../../actions/main/reservation";
import { produce } from "immer";

const initState = {
    status: READY_RESERVATION,
    date: new Date(0),
    available: [],
    reserved: [],
    error: ""            
}

//TODO: 여기부터 시작

export default (state = initState, action) => {    
    const {type, payload} = action;    
    switch (type) {        
        case FETCHING_RESERVATION:
            return produce(state, draft => {
                draft.status = type;
                draft.date = payload;
                draft.availabe = state.available;
                draft.reserved = state.reserved;
                draft.error = "";
            });
        case RESERVATION_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.date = state.date;
                draft.available = payload.available;
                draft.reserved = payload.reservations;
                draft.error = "";
            });
        case RESERVATION_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.date = state.date;
                draft.available = [];
                draft.reserved = [];
                draft.error = payload;
            })
        default:
            return state;
    }
}