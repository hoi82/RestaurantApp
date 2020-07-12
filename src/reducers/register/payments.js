import { CREATE_PAYMENT, UPDATE_PAYMENT, DELETE_PAYMENT, SELECT_PAYMENT } from "../../actions/register/payments";
import { Payments } from "../../types/Variables";

const initialPayments = {
    
}

const payments = (state = initialPayments, action) => {    
    const { type, payload } = action;
    switch (type) {
        case CREATE_PAYMENT:
            let create = Object.assign({}, payload);            
            const createState = Object.assign({}, state);
            create.id = createState.list.length;
            createState.list.push(create);
            switch (payload.kind) {
                case Payments.CREDIT_CARD:
                    createState.currentCreditCard = create;
                    createState.currnetPaypal = null;
                    break;
                case Payments.PAYPAL:
                    createState.currnetPaypal = create;
                    createState.currentCreditCard = null;
                default:
                    break;
            }
            return createState;
        case SELECT_PAYMENT:
            let selectState = Object.assign({}, state);
            switch (selectState.list[payload].kind) {
                case Payments.CREDIT_CARD:
                    selectState.currentCreditCard = selectState.list[payload];
                    break;
                case Payments.PAYPAL:
                    selectState.currnetPaypal = selectState.list[payload];
                default:
                    break;
            }            
            return selectState;
        case UPDATE_PAYMENT:            
            let update = Object.assign({}, payload);
            const updateState = Object.assign({}, state);
            updateState.list[update.id] = update;
            return updateState;
        case DELETE_PAYMENT:        
            const deleteState = Object.assign({}, state);
            deleteState.list.splice(payload);
            return deleteState;        
        default:            
            return state;            
    }
}

export default payments;