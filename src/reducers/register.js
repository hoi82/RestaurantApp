import regInitialState from "../stores/register";
import { UPDATE_REG_PROFILE, ADD_REG_PAYMENT, UPDATE_REG_PAYMENT, INIT_REG, VALIDATE_FIELD_REG, VALIDATE_ALL_REG } from "../actions/register";

const register = (state = regInitialState, action) => {
    switch (action.type) {
        case UPDATE_REG_PROFILE:
            {                                                                                               
                let obj = state.clone();
                Object.assign(obj, action.value);
                return obj;                
            }            
            break;
        case VALIDATE_FIELD_REG:
            {                
                let obj = state.clone();
                obj.validate(action.value);
                return obj;
            }
        case VALIDATE_ALL_REG:
            {
                let obj = state.clone();
                obj.validate("all");
                return obj;
            }
        case INIT_REG:
            {                             
                return state.init();
            }
            break;
        case ADD_REG_PAYMENT: 
            {
                state.payments.push(action.value);
                return state;
            }
            break;
        case UPDATE_REG_PAYMENT: 
            {                
                state.payments[action.index] = value;
                return obj;
            }
        default:
            return state;
            break;
    }
}

export default register;