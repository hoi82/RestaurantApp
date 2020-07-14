import produce from "immer";

const { READY_TO_FETCH_MENU, FETCHING_MENU, MENU_FETCHED, MENU_FETCH_FAILED } = require("../../../actions/main/menu");

const initState = {
    status: READY_TO_FETCH_MENU,    
    isPending: true,
    menuID: "",
    restaurantID: "",
    name: "",
    thumbnail: "",
    ingredients: "",
    description: "",
    takeoutEnable : false,
    price: null,
    error: ""
}

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCHING_MENU:
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = true;
                draft.menuID = payload;
                draft.error = "";
            });
        case MENU_FETCHED:            
            return produce(state, draft => {
                draft.status = type;
                draft.isPending = false;
                draft.menuID = payload.id;
                draft.restaurantID = payload.restaurantID;
                draft.name = payload.name;
                draft.thumbnail = payload.thumbnail;
                draft.ingredients = payload.ingredients;
                draft.description = payload.description;
                draft.takeoutEnable = payload.takeout;
                draft.price = payload.price;
                draft.error = "";
            })
        case MENU_FETCH_FAILED:
            return produce(state, draft => {                
                draft.status = type;
                draft.isPending = false;
                draft.error = payload;
            })
        default:
            return state;
    }
}