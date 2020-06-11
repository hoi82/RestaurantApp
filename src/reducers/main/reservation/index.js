import { UPDATE_RESERVATION_TIME, UPDATE_RESERVATION_MEMBER, UPDATE_RESERVATION_MESSAGE, READY_TO_REGISTER_RESERVATION, READY_TO_FETCH_RESERVATION_LIST, FETCHING_RESERVATION_LIST, RESERVATION_LIST_FETCHED, RESERVATION_LIST_FETCH_FAILED, PROCESSING_RESERVATION, RESERVATION_COMPLETE, RESERVATION_FAILED } from "../../../actions/main/reservation";
import { produce } from "immer";

const initState = {
    status: READY_TO_REGISTER_RESERVATION,
    date: new Date(),
    start: null,
    end: null,
    member: 0,
    message: "",
    reservedStatus: READY_TO_FETCH_RESERVATION_LIST,
    reserved: [],
    error: "",    
    sessionID: null
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
                draft.sessionID = payload;
                draft.date = new Date(),
                draft.start = null;
                draft.end = null;
                draft.member = 0;
                draft.message = "";
            })                       
        case RESERVATION_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.error = payload;
                draft.sessionID = null;
            })            

        // Fetch Reservation List
        case FETCHING_RESERVATION_LIST:
            return produce(state, draft => {
                draft.reservedStatus = type;
                draft.date = payload;
            })            
        case RESERVATION_LIST_FETCHED:
            return produce(state, draft => {
                draft.reservedStatus = type;
                draft.reserved = payload;
            })            
        case RESERVATION_LIST_FETCH_FAILED:
            return produce(state, draft => {
                draft.reservedStatus = type;
                draft.error = payload;
            })            
        default:
            return state;
    }
}