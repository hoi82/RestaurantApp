import produce from "immer";

const { READY_TO_FETCH_MY_RESERVATION, FETCHING_MY_RESERVATION, MY_RESERVATION_FETCHED, MY_RESERVATION_FETCH_FAILED } = require("../../../actions/main/myReservation");

const initState = {
    status: READY_TO_FETCH_MY_RESERVATION,
    isPending: true,
    reservations: [],
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCHING_MY_RESERVATION:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
            });
        case MY_RESERVATION_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.reservations = payload;
                draft.error = "";
            })
        case MY_RESERVATION_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.error = payload;
            })
        default:
            return state;
    }
}