import { READY_TO_LOAD_RESTAURANT, LOADING_RESTAURANT, LOADED_RESTAURANT, FAIL_TO_LOAD_RESTAURANT } from "../../../actions/main/restaurant/details";
import { produce } from "immer";

const initState = {
    status: READY_TO_LOAD_RESTAURANT,
    isPending: true,
    id: "",
    name: "",
    category: "",
    thumbnail: null,
    address: {
        country: "",
        state: "",
        remains: ""
    },    
    opens: {
        timezone: "",
        time: [[],[],[],[],[],[],[]]
    },
    reservation: undefined,
    menus: [],
    contact: [],
    description: "",
    reviews: [],
    error: ""
}

export default (state = initState, action) => {
    const {type, payload} = action;    
    switch (type) {
        case LOADING_RESTAURANT:
            return produce(state, draft => {                
                draft.status = LOADING_RESTAURANT;
                draft.isPending = true;
                draft.id = payload;
            })            
        case LOADED_RESTAURANT:
            return produce(state, draft => {
                Object.assign(draft, payload);
                draft.status = LOADED_RESTAURANT;
                draft.isPending = false;
                draft.error = "";
            })            
        case FAIL_TO_LOAD_RESTAURANT:
            return produce(state, draft => {
                draft.status = FAIL_TO_LOAD_RESTAURANT;
                draft.isPending = false;
                draft.error = payload.error;
            })            
        default:
            return state;
    }
}