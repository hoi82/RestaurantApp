import initialCreditCard from "../../stores/register/creditCard";
import { UPDATE_NUMBER, UPDATE_EXPIRE, UPDATE_CVC, UPDATE_CASHHOLDER, ASSIGN_CREDIT_CARD, NEW_CREDIT_CARD } from "../../actions/register/creditCard";

const creditCard = (state = initialCreditCard, action) => {   
    const {type, payload} = action; 
    switch (type) {
        case UPDATE_NUMBER:            
            return Object.assign({}, state, { number: payload });
        case UPDATE_EXPIRE:
            return Object.assign({}, state, { expire: payload });
        case UPDATE_CVC:
            return Object.assign({}, state, { cvc: payload });
        case UPDATE_CASHHOLDER:
            return Object.assign({}, state, { cashHolder: payload });
        case ASSIGN_CREDIT_CARD:
            return Object.assign({}, state, payload);
        case NEW_CREDIT_CARD:                    
            return Object.assign({}, initialCreditCard);
        default:
            return state;
    }
}

export default creditCard;