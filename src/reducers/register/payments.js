import initialPayments from "../../stores/register/payments";
import { CREATE_PAYMENT, UPDATE_PAYMENT, DELETE_PAYMENT, SELECT_PAYMENT } from "../../actions/register/payments";

const payments = (state = initialPayments, action) => {
    let list = state.list.slice();
    switch (action.type) {
        case CREATE_PAYMENT:
            let create = Object.assign({}, action.value);
            create.id = list.length;            
            return {                
                list: [...list, create],
                selectedPayment: create
            }
        case SELECT_PAYMENT:            
            return {
                list: state.list,
                selectedPayment: state.list[action.index]
            };
        case UPDATE_PAYMENT:            
            let update = Object.assign({}, action.value);
            list[update.id] = update;
            return {
                list: list,
                selectedPayment: update
            }
        case DELETE_PAYMENT:
            let deleted = list.splice(action.index);
            return {
                list: list,
                selectedPayment: deleted
            }
        default:            
            return state;            
    }
}

export default payments;