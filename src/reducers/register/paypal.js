import initialPaypal from "../../stores/register/paypal";
import { UPDATE_EMAIL, UPDATE_PASSWORD, VALIDATE_EMAIL, VALIDATE_PASSWORD, ASSIGN_PAYPAL, NEW_PAYPAL, REFRESH_PAYPAL } from "../../actions/register/paypal";
import Validator from "../../utils/Validator";

const paypal = (state = initialPaypal, action) => {
    switch (action.type) {
        case UPDATE_EMAIL:
            return Object.assign({}, state, { email: action.value, emailChanged: true });            
        case UPDATE_PASSWORD:
            return Object.assign({}, state, { password: action.value, passwordChanged: true });
        case VALIDATE_EMAIL:
            return Object.assign({}, state, { emailError: state.emailChanged ? Validator.validateEmail(state.email) : state.emailError });
        case VALIDATE_PASSWORD:
            return Object.assign({}, state, { passwordError: state.passwordChanged ? Validator.validateExternalPassword(state.password) : state.passwordError});
        case ASSIGN_PAYPAL:
            return Object.assign({}, state, action.value);
        case NEW_PAYPAL:
            return Object.assign({}, initialPaypal);
        case REFRESH_PAYPAL:
            state.emailError = Validator.validateEmail(state.email);
            state.passwordError = Validator.validateExternalPassword(state.password);
            return Object.assign({}, state);
        default:            
            return state;
    }
}

export default paypal;