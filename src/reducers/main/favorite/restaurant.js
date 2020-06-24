import { produce } from "immer";
import { READY_TO_FETCH_FAVORITE_RESTAURANTS, FETCHING_FAVORITE_RESTAURANTS, FAVORITE_RESTAURANTS_FETCHED, 
    FAVORITE_RESTAURANTS_FETCH_FAILED, DELETE_FAVORITE_RESTAURANT, ADD_FAVORITE_RESTAURANT, 
    TOGGLE_ALL_FAVORITE_RESTAURANTS, TOGGLE_FAVORITE_RESTAURANT, REMOVE_SELECTED_FAVORITE_RESTAURANTS } from "../../../actions/main/favorite/restaurant";

const initState = {
    status: READY_TO_FETCH_FAVORITE_RESTAURANTS,
    userid: "",    
    list: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCHING_FAVORITE_RESTAURANTS:
            return produce(state, draft => {
                draft.status = type;
                draft.userid = payload;
                draft.list = state.list;
                draft.error = "";
            });            
        case FAVORITE_RESTAURANTS_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.userid = state.userid;
                draft.list = payload.map((item) => ({...item, selected: false}));
                draft.error = "";
            });            
        case FAVORITE_RESTAURANTS_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.userid = state.userid;
                draft.list = [];
                draft.error = payload;
            })            
        case DELETE_FAVORITE_RESTAURANT:
            return produce(state, draft => {
                draft.status = FAVORITE_RESTAURANTS_FETCHED;
                draft.userid = state.userid;
                draft.list = state.list.filter((item) => item.id != payload);
                draft.error = state.error;
            })            
        case ADD_FAVORITE_RESTAURANT:
            return produce(state, draft => {
                draft.status = FAVORITE_RESTAURANTS_FETCHED;
                draft.userid = state.userid;
                draft.list.push({...payload, selected: false});
                draft.error = state.error;
            })  
        case TOGGLE_ALL_FAVORITE_RESTAURANTS:
            return produce(state, draft => {
                draft.list = state.list.map((item) => {
                    return {...item, selected: payload};
                });
            })  
        case TOGGLE_FAVORITE_RESTAURANT:
            return produce(state, draft => {
                draft.list[payload].selected = !draft.list[payload].selected;
            })
        case REMOVE_SELECTED_FAVORITE_RESTAURANTS:
            return produce(state, draft => {
                draft.status = FAVORITE_RESTAURANTS_FETCHED;
                draft.list = state.list.filter((item) => payload.includes(item.id));
            })           
        default:
            return state;
    }
}