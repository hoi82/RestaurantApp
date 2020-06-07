import { UPDATE_RESERVATION_TIME, UPDATE_RESERVATION_MEMBER, UPDATE_RESERVATION_MESSAGE, READY_TO_REGISTER_RESERVATION } from "../../../actions/main/reservation";

const initState = {
    state: READY_TO_REGISTER_RESERVATION,
    start: null,
    end: null,
    member: 0,
    message: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_RESERVATION_TIME:
            return Object.assign({}, state, { start: payload.start, end: payload.end });        
        case UPDATE_RESERVATION_MEMBER:
            return Object.assign({}, state, { member: payload });
        case UPDATE_RESERVATION_MESSAGE:
            return Object.assign({}, state, { message: payload });
        default:
            return state;
    }
}