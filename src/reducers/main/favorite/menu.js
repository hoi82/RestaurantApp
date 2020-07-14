import produce from "immer";

const { READY_TO_FETCH_FAVORITE_MENUS, FETCHING_FAVORITE_MENUS, FAVORITE_MENUS_FETCHED, FAVORITE_MENUS_FETCH_FAILED, DELETE_FAVORITE_MENU, ADD_FAVORITE_MENU, TOGGLE_ALL_FAVORITE_MENUS, TOGGLE_FAVORITE_MENU, REMOVE_SELECTED_FAVORITE_MENUS } = require("../../../actions/main/favorite/menu");

const initState = {
    status: READY_TO_FETCH_FAVORITE_MENUS,
    isPending: true,
    userid: "",
    list: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCHING_FAVORITE_MENUS:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
                draft.userid = payload;
                draft.list = state.list;
                draft.error = "";
            });            
        case FAVORITE_MENUS_FETCHED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.userid = state.userid;
                draft.list = payload.map((item) => ({...item, selected: false}));
                draft.error = "";
            });            
        case FAVORITE_MENUS_FETCH_FAILED:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.userid = state.userid;
                draft.list = [];
                draft.error = payload;
            })            
        case DELETE_FAVORITE_MENU:
            return produce(state, draft => {
                draft.status = FAVORITE_MENUS_FETCHED;
                draft.userid = state.userid;
                draft.list = state.list.filter((item) => item.id != payload);
                draft.error = state.error;
            })            
        case ADD_FAVORITE_MENU:
            return produce(state, draft => {
                draft.status = FAVORITE_MENUS_FETCHED;
                draft.isPending = false;
                draft.userid = state.userid;
                draft.list.push({...payload, selected: false});
                draft.error = state.error;
            })  
        case TOGGLE_ALL_FAVORITE_MENUS:
            return produce(state, draft => {
                draft.list = state.list.map((item) => {
                    return {...item, selected: payload};
                });
            })  
        case TOGGLE_FAVORITE_MENU:
            return produce(state, draft => {
                draft.list[payload].selected = !draft.list[payload].selected;
            })
        case REMOVE_SELECTED_FAVORITE_MENUS:
            return produce(state, draft => {
                draft.status = FAVORITE_MENUS_FETCHED;
                draft.isPending = false;
                draft.list = state.list.filter((item) => payload.includes(item.id));
            })           
        default:
            return state;
    }
}