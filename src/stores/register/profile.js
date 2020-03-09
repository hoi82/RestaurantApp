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
}

export default initialProfile;