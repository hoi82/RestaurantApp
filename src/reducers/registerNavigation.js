import regNaviInitial from "../stores/registerNavigation";
import { NAVIGATE_ROOT, NAVIGATE_PAYMENT } from "../actions/registerNavigation";

const regNavi = (state = regNaviInitial, action) => {
    switch (action.type) {
        case NAVIGATE_ROOT:
            {
                return {
                    root: action.value,
                    payment: state.payment,
                    hasParams: false,
                    params: null
                }
            }
            break;
        case NAVIGATE_PAYMENT: 
            {
                return {
                    root: state.root,
                    payment: action.value,
                    hasParams: action.hasParams,
                    params: action.params
                }
            }
            break;
        default:
            return state;
            break;
    }
}

export default regNavi;