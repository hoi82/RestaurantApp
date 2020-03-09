export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const VALIDATE_EMAIL = "VALIDATE_EMAIL";
export const VALIDATE_PASSWORD = "VALIDATE_PASSWORD";
export const VALIDATE_NAME = "VALIDATE_NAME";
export const VALIDATE_CONTACT = "VALIDATE_CONTACT";
export const VALIDATE_ADDRESS = "VALIDATE_ADDRESS";
export const REFRESH_PROFILE = "REFRESH_PROFILE";
export const CLREAR_PROFILE = "CLEAR_PROFILE";

export const updateEmail = (value) => {
    return {
        type: UPDATE_EMAIL,
        value: value
    }
}

export const updatePassword = (value) => {
    return {
        type: UPDATE_PASSWORD,
        value: value
    }
}

export const updateName = (value) => {
    return {
        type: UPDATE_NAME,
        value: value
    }
}

export const updateContact = (value) => {
    return {
        type: UPDATE_CONTACT,
        value: value
    }
}

export const updateAddress = (value) => {
    return {
        type: UPDATE_ADDRESS,
        value: value
    }
}

export const notifyChange = (fieldName) => {    
    return {
        type: NOTIFY_CHANGE,        
        value: fieldName
    }
}

export const validateEmail = () => {
    return {
        type: VALIDATE_EMAIL
    }
}

export const validatePassword = () => {
    return {
        type: VALIDATE_PASSWORD
    }
}

export const validateName = () => {
    return {
        type: VALIDATE_NAME
    }
}

export const validateContact = () => {
    return {
        type: VALIDATE_CONTACT
    }
}

export const validateAddress = () => {
    return {
        type: VALIDATE_ADDRESS
    }
}

export const refreshProfile = () => {
    return {
        type: REFRESH_PROFILE
    }
}

export const clearProfile = () => {
    return {
        type: CLREAR_PROFILE
    }
}
