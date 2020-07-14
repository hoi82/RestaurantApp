import produce from "immer";

const { READY_TO_REGISTER_USER, REGISTERING_USER, USER_REGISTERED, USER_REGISTRATION_FAILED } = require("../../actions/register");

const initState = {
    status: READY_TO_REGISTER_USER,
    isPending: false,
    registered: false,
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTERING_USER:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;                
            })            
        case USER_REGISTERED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.registered = true;
                draft.error = "";
            })
        case USER_REGISTRATION_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.registered = false;
                draft.error = payload;
            })
        default:
            return state;
    }
}