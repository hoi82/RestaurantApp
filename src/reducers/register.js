import regInitialState from "../stores/register";
import { UPDATE_REG_INFO } from "../actions/register";

const register = (state = regInitialState, action) => {
    switch (action.type) {
        case UPDATE_REG_INFO:
            {                                                            
                return Object.assign({}, state, action.value);
            }            
            break;
        default:
            return state;
            break;
    }
}

export default register;