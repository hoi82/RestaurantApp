import { UPDATE_PAYPAL_EMAIL, UPDATE_PAYPAL_PASSWORD, ASSIGN_PAYPAL, NEW_PAYPAL } from "../../actions/register/paypal";

const initialPaypal = {

};

const paypal = (state = initialPaypal, action) => {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_PAYPAL_EMAIL:
            return Object.assign({}, state, { email: payload });
        case UPDATE_PAYPAL_PASSWORD:
            return Object.assign({}, state, { password: payload });
        case ASSIGN_PAYPAL:
            return Object.assign({}, state, payload);
        case NEW_PAYPAL:
            return Object.assign({}, initialPaypal);        
        default:            
            return state;
    }
}

export default paypal;