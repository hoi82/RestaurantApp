import { ErrorMessages } from "../../types/ErrorMessages";
import { Payments } from "../../types/Variables";
import Validator from "../../utils/Validator";

const initialPaypal = {
    id: 0,
    kind: Payments.PAYPAL,
    email: "",    
    password: "",    
    getValid: function() {        
        if (Validator.validateEmail(this.email) != ErrorMessages.CORRECT)        
            return false;

        if (Validator.validateExternalPassword(this.password) != ErrorMessages.CORRECT)
            return false;        

        return true;
    }    
}

export default initialPaypal;