import initialCreditCard from "../../stores/register/creditCard";
import { UPDATE_NUMBER, UPDATE_EXPIRE, UPDATE_CVC, UPDATE_CASHHOLDER, VALIDATE_NUMBER, VALIDATE_EXPIRE, VALIDATE_CVC, REFRESH_CREDIT_CARD, VALIDATE_CASHHOLDER, ASSIGN_CREDIT_CARD, NEW_CREDIT_CARD } from "../../actions/register/creditCard";
import Validator from "../../utils/Validator";

const creditCard = (state = initialCreditCard, action) => {    
    switch (action.type) {
        case UPDATE_NUMBER:            
            return Object.assign({}, state, { number: action.value, numberChanged: true });
        case UPDATE_EXPIRE:
            return Object.assign({}, state, { expire: action.value, expireChanged: true });
        case UPDATE_CVC:
            return Object.assign({}, state, { cvc: action.value, cvcChanged: true });
        case UPDATE_CASHHOLDER:
            return Object.assign({}, state, { cashHolder: action.value, cashHolderChanged: true });
        case VALIDATE_NUMBER:
            if (state.numberChanged) {
                let obj = Validator.validateCreditNumber(state.number);
                return Object.assign({}, state, { type: obj.name, numberError: obj.error });
            }
            else {
                return state;
            }            
        case VALIDATE_EXPIRE:
            return Object.assign({}, state, { expireError: state.expireChanged ? Validator.validateExpire(state.expire) : state.expireError });
        case VALIDATE_CVC:
            return Object.assign({}, state, { cvcError: state.cvcChanged ? Validator.validateCVC(state.cvc) : state.cvcError });
        case VALIDATE_CASHHOLDER:            
            return Object.assign({}, state, { cashHolderError: state.cashHolderChanged ? Validator.validateName(state.cashHolder) : state.cashHolderError });
        case REFRESH_CREDIT_CARD:      
            //NOTE:state를 변경하지 않고 새 오브젝트에 바로 넣어주면 event handler에서 이 액션을 호출할 경우 다시 랜더링이 되지 않음.
            let obj = Validator.validateCreditNumber(state.number);
            state.type = obj.name;
            state.numberError = obj.error;
            state.expireError = Validator.validateExpire(state.expire);
            state.cvcError = Validator.validateCVC(state.cvc);
            state.cashHolderError = Validator.validateName(state.cashHolder);            
            return Object.assign({}, state);          
        case ASSIGN_CREDIT_CARD:
            return Object.assign({}, state, action.value);
        case NEW_CREDIT_CARD:                    
            return Object.assign({}, initialCreditCard);
        default:
            return state;
    }
}

export default creditCard;