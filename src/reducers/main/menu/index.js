import { READY_TO_FETCH_MENUS, FETCHING_MENUS, MENUS_FETCHED, MENUS_FETCH_FAILED } from "../../../actions/main/menu";

const initState = {
    status: READY_TO_FETCH_MENUS,
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
                resid: payload,
                list: state.list,
                error: ""
            }
        case MENUS_FETCHED:
            return {
                status: type,
                resid: state.resid,
                list: payload,
                error: ""
            }
        case MENUS_FETCH_FAILED:
            return {
                status: type,
                resid: state.resid,
                list: [],
                error: payload
            }
        default:
            return state;
    }
}