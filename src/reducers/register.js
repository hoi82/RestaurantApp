import regInitialState from "../stores/register";
import { UPDATE_REG_PROFILE, ADD_REG_PAYMENT, UPDATE_REG_PAYMENT, INIT_REG } from "../actions/register";

const register = (state = regInitialState, action) => {
    switch (action.type) {
        case UPDATE_REG_PROFILE:
            {                                                                 
                let obj = Object.assign({}, state, action.value);                
                return obj;
            }            
            break;
        case INIT_REG:
            {                             
                return regInitialState;
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