import { ErrorMessages } from "../../types/ErrorMessages";
import { Payments } from "../../types/Variables";

const initialPaypal = {
    id: 0,
    kind: Payments.PAYPAL,
    email: "",
    emailChanged: false,
    emailError: ErrorMessages.CORRECT,
    password: "",
    passwordChanged: false,
    passwordError: ErrorMessages.CORRECT,
    getValid: function() {        
        if (this.emailError != ErrorMessages.CORRECT)
            return false;

        if (this.passwordError != ErrorMessages.CORRECT)
            return false;        

        return true;
    }    
}

export default initialPaypal;