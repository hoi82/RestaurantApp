import { READY_TO_FETCH_MENUS, FETCHING_MENUS, MENUS_FETCHED, MENUS_FETCH_FAILED } from "../../../actions/main/restaurant/menus";

const initState = {
    status: READY_TO_FETCH_MENUS,
    isPending: true,
    resid: "",
    list: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case FETCHING_MENUS:
            return {
                status: type,
                isPending: true,
                resid: payload,
                list: state.list,
                error: ""
            }
        case MENUS_FETCHED:
            return {
                status: type,
                isPending: false,
                resid: state.resid,
                list: payload,
                error: ""
            }
        case MENUS_FETCH_FAILED:
            return {
                status: type,
                isPending: false,
                resid: state.resid,
                list: [],
                error: payload
            }
        default:
            return state;
    }
}