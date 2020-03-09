import { ErrorMessages } from "../../data/ErrorMessages";
import { Payments } from "../../data/Variables";

const initialCreditCard = {
    id: 0,
    kind: Payments.CREDIT_CARD,
    type: "",
    number: "",
    numberChanged: false,
    numberError: ErrorMessages.CORRECT,
    expire: "",
    expireChanged: false,
    expireError: ErrorMessages.CORRECT,
    cvc: "",
    cvcChanged: false,
    cvcError: ErrorMessages.CORRECT,
    cashHolder: "",
    cashHolderChanged: false,
    cashHolderError: ErrorMessages.CORRECT,
    getValid: function() {        
        if (this.numberError != ErrorMessages.CORRECT)
            return false;

        if (this.expireError != ErrorMessages.CORRECT)
            return false;

        if (this.cvcError != ErrorMessages.CORRECT)
            return false;

        if (this.cashHolderError != ErrorMessages.CORRECT)
            return false;

        return true;
    }    
}

export default initialCreditCard;