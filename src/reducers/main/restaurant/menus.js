import { READY_TO_FETCH_MENUS, FETCHING_MENUS, MENUS_FETCHED, MENUS_FETCH_FAILED } from "../../../actions/main/restaurant/menus";
import produce from "immer";

const initState = {
    status: READY_TO_FETCH_MENUS,
    isPending: true,
    restaurantID: "",
    list: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCHING_MENUS:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
                draft.restaurantID = payload;
            });            
        case MENUS_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.list = payload;
                draft.error = "";
            });            
        case MENUS_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.list = [];
                draft.error = payload;
            })            
        default:
            return state;
    }
}