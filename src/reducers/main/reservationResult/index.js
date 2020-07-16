import produce from "immer";

const { READY_TO_FETCH_RESERVATION_RESULT, FETCHING_RESERVATION_RESULT, RESERVATION_RESULT_FETCHED, RESERVATION_RESULT_FETCH_FAILED } = require("../../../actions/main/reservationResult");

const initState = {
    status: READY_TO_FETCH_RESERVATION_RESULT,
    isPending: true,
    restaurantID: "",
    restaurantName: "",
    restaurantAddress: {},
    reservationName: "",
    time: "",
    member: 0,
    message: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;    
    switch (type) {
        case FETCHING_RESERVATION_RESULT:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
                draft.restaurantID = payload;
            })            
        case RESERVATION_RESULT_FETCHED:            
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.restaurantID = payload.resid;
                draft.restaurantName = payload.resname;
                draft.restaurantAddress = payload.resaddress;
                draft.reservationName = payload.username; 
                draft.time = payload.time;   
                draft.member = payload.member;
                draft.message = payload.message;            
            });
        case RESERVATION_RESULT_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.restaurantID = "";
                draft.restaurantName = "";
                draft.restaurantAddress = {};
                draft.reservationName = "";
                draft.time = "";
                draft.member = 0;
                draft.message = "";
            })
        default:
            return state;
    }
}