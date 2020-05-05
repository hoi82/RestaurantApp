import initialProfile from "../../stores/register/profile";
import { UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_NAME, UPDATE_CONTACT, UPDATE_ADDRESS, REFRESH_PROFILE } from "../../actions/register/profile";
import Validator from "../../utils/Validator";

const profile = (state = initialProfile, action) => {    
    switch (action.type) {        
        case UPDATE_EMAIL:            
            return Object.assign({}, state, { email: action.value });
        case UPDATE_PASSWORD:            
        return Object.assign({}, state, { password: action.value });
        case UPDATE_NAME:
            return Object.assign({}, state, { name: action.value });
        case UPDATE_CONTACT:
            return Object.assign({}, state, { contact: action.value });
        case UPDATE_ADDRESS:
            return Object.assign({}, state, { address: action.value });                
        default:
            return state;
    }
}

export default profile;