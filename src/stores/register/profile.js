import { ErrorMessages } from "../../types/ErrorMessages";
import Validator from "../../utils/Validator";

const initialProfile = {
    email: "",        
    password: "",        
    name: "",        
    contact: "",        
    address: "",    
    getValid: function() {        
        if (Validator.validateEmail(this.email) != ErrorMessages.CORRECT)
            return false;

        if (Validator.validatePassword(this.password) != ErrorMessages.CORRECT)
            return false;

        if (Validator.validateName(this.name) != ErrorMessages.CORRECT)
            return false;

        if (Validator.validateContact(this.contact) != ErrorMessages.CORRECT)
            return false;

        if (Validator.validateAddress(this.address) != ErrorMessages.CORRECT)
            return false;

        return true;
    }    
}

export default initialProfile;