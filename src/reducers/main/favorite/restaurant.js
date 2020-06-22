import { produce } from "immer";
import { READY_TO_FETCH_FAVORITES, FETCHING_FAVORITES, FAVORITES_FETCHED, FAVORITES_FETCH_FAILED, DELETE_FAVORITE, ADD_FAVORITE, TOGGLE_ALL_FAVORITES, TOGGLE_FAVORITE, REMOVE_SELECTED_FAVORITE } from "../../../actions/main/favorite/restaurant";

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
            return produce(state, draft => {
                draft.status = type;
                draft.userid = payload;
                draft.list = state.list;
                draft.error = "";
            });            
        case FAVORITES_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.userid = state.userid;
                draft.list = payload.map((item) => ({...item, selected: false}));
                draft.error = "";
            });            
        case FAVORITES_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.userid = state.userid;
                draft.list = [];
                draft.error = payload;
            })            
        case DELETE_FAVORITE:
            return produce(state, draft => {
                draft.status = FAVORITES_FETCHED;
                draft.userid = state.userid;
                draft.list = state.list.filter((item) => item.id != payload);
                draft.error = state.error;
            })            
        case ADD_FAVORITE:
            return produce(state, draft => {
                draft.status = FAVORITES_FETCHED;
                draft.userid = state.userid;
                draft.list.push({...payload, selected: false});
                draft.error = state.error;
            })  
        case TOGGLE_ALL_FAVORITES:
            return produce(state, draft => {
                draft.list = state.list.map((item) => {
                    return {...item, selected: payload};
                });
            })  
        case TOGGLE_FAVORITE:
            return produce(state, draft => {
                draft.list[payload].selected = !draft.list[payload].selected;
            })
        case REMOVE_SELECTED_FAVORITE:
            return produce(state, draft => {
                draft.status = FAVORITES_FETCHED;
                draft.list = state.list.filter((item) => payload.includes(item.id));
            })           
        default:
            return state;
    }
}