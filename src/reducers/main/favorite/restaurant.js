import { READY_TO_FETCH_FAVORITES, FETCHING_FAVORITES, FAVORITES_FETCHED, FAVORITES_FETCH_FAILED, DELETE_FAVORITE, ADD_FAVORITE } from "../../../actions/main/favorite/restaurant";

const initState = {
    status: READY_TO_FETCH_FAVORITES,
    userid: "",    
    list: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCHING_FAVORITES:
            return {
                status: type,
                userid: payload,
                list: state.list,
                error: ""
            }
        case FAVORITES_FETCHED:
            return {
                status: type,
                userid: state.userid,
                list: payload,
                error: "",
            }            
        case FAVORITES_FETCH_FAILED:
            return {
                status: type,
                userid: state.userid,
                list: [],
                error: payload
            }
        case DELETE_FAVORITE:
            return {
                status: FAVORITES_FETCHED,
                userid: state.userid,
                list: state.list.filter((item) => item.id != payload),
                error: state.error
            }
        case ADD_FAVORITE:
            return {
                status: FAVORITES_FETCHED,
                userid: state.userid,
                list: [...state.list, payload],
                error: state.error
            }
        default:
            return state;
    }
}