import initialProfile from "../../stores/register/profile";
import { UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_NAME, UPDATE_CONTACT, UPDATE_ADDRESS, VALIDATE_EMAIL, VALIDATE_PASSWORD, VALIDATE_NAME, VALIDATE_CONTACT, VALIDATE_ADDRESS, REFRESH_PROFILE } from "../../actions/register/profile";
import Validator from "../../utils/Validator";

const profile = (state = initialProfile, action) => {    
    switch (action.type) {        
        case UPDATE_EMAIL:            
            return Object.assign({}, state, { email: action.value, emailChanged: true });
        case UPDATE_PASSWORD:            
        return Object.assign({}, state, { password: action.value, passwordChanged: true });
        case UPDATE_NAME:
            return Object.assign({}, state, { name: action.value, nameChanged: true });
        case UPDATE_CONTACT:
            return Object.assign({}, state, { contact: action.value, contactChanged: true });
        case UPDATE_ADDRESS:
            return Object.assign({}, state, { address: action.value, addressChanged: true});
        case VALIDATE_EMAIL:
            return Object.assign({}, state, { emailError: state.emailChanged ? Validator.validateEmail(state.email) : state.emailError });
        case VALIDATE_PASSWORD:
            return Object.assign({}, state, { passwordError: state.passwordChanged ? Validator.validatePassword(state.password) : state.passwordError });
        case VALIDATE_NAME:
            return Object.assign({}, state, { nameError: state.nameChanged ? Validator.validateName(state.name) : state.nameError });
        case VALIDATE_CONTACT:
            return Object.assign({}, state, { contactError: state.contactChanged ? Validator.validateContact(state.contact) : state.contactError });
        case VALIDATE_ADDRESS:
            return Object.assign({}, state, { addressError: state.addressChanged ? Validator.validateAddress(state.address) : state.addressError });
        case REFRESH_PROFILE:
            return Object.assign({}, state, {
                emailChanged: true,
                passwordChanged: true,
                nameChanged: true,
                contactChanged: true,
                addressChanged: true,
                emailError: Validator.validateEmail(state.email),
                passwordError: Validator.validatePassword(state.password),
                nameError: Validator.validateName(state.name),
                contactError: Validator.validateContact(state.contact),
                addressError: Validator.validateAddress(state.address)
            });
        default:
            return state;
    }
}

export default profile;