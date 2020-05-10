import { ErrorMessages } from "../../types/ErrorMessages";
import { Payments } from "../../types/Variables";
import Validator from "../../utils/Validator";

const initialCreditCard = {
    id: 0,
    kind: Payments.CREDIT_CARD,
    type: "",
    number: "",    
    expire: "",    
    cvc: "",    
    cashHolder: "",    
    getValid: function() {        
        if (Validator.validateCreditNumber(this.number).error != ErrorMessages.CORRECT)
            return false;

        if (Validator.validateExpire(this.expire) != ErrorMessages.CORRECT)
            return false;

        if (Validator.validateCVC(this.cvc) != ErrorMessages.CORRECT)
            return false;

        if (Validator.validateName(this.cashHolder) != ErrorMessages.CORRECT)
            return false;

        return true;
    }    
}

export default initialCreditCard;