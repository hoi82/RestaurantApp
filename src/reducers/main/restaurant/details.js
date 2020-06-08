import { READY_TO_LOAD_RESTAURANT, LOADING_RESTAURANT, LOADED_RESTAURANT, FAIL_TO_LOAD_RESTAURANT } from "../../../actions/main/restaurant/details";

const initState = {
    status: READY_TO_LOAD_RESTAURANT,
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
            return Object.assign({...state}, {status: LOADING_RESTAURANT});
        case LOADED_RESTAURANT:
            if (payload.id) {
                return Object.assign({}, payload, {status: LOADED_RESTAURANT, error: ""});
            }else {
                return Object.assign({...initState}, {status: FAIL_TO_LOAD_RESTAURANT, error: payload.error});
            }
        case FAIL_TO_LOAD_RESTAURANT: 
            return Object.assign({...initState}, {status: FAIL_TO_LOAD_RESTAURANT, error: payload.error});
        default:
            return state;
    }
}