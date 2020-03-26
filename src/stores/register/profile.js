import { ErrorMessages } from "../../data/ErrorMessages";

const initialProfile = {
    email: "",    
    emailError: ErrorMessages.CORRECT,
    emailChanged: false,
    password: "",    
    passwordError: ErrorMessages.CORRECT,
    passwordChanged: false,
    name: "",    
    nameError: ErrorMessages.CORRECT,
    nameChanged: false,
    contact: "",    
    contactError: ErrorMessages.CORRECT,
    contactChanged: false,
    address: "",
    addressError: ErrorMessages.CORRECT,
    addressChanged: false,
    getValid: function() {        
        if (this.emailError != ErrorMessages.CORRECT)
            return false;

        if (this.passwordError != ErrorMessages.CORRECT)
            return false;

        if (this.nameError != ErrorMessages.CORRECT)
            return false;

        if (this.contactError != ErrorMessages.CORRECT)
            return false;

        if (this.addressError != ErrorMessages.CORRECT)
            return false;

        return true;
    }    
}

export default initialProfile;