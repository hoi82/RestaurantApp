export const UPDATE_PROFILE_EMAIL = "UPDATE_PROFILE_EMAIL";
export const UPDATE_PROFILE_PASSWORD = "UPDATE_PROFILE_PASSWORD";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const CLREAR_PROFILE = "CLEAR_PROFILE";

export const updateEmail = (value) => {
    return {
        type: UPDATE_PROFILE_EMAIL,
        value: value
    }
}

export const updatePassword = (value) => {
    return {
        type: UPDATE_PROFILE_PASSWORD,
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

export const clearProfile = () => {
    return {
        type: CLREAR_PROFILE
    }
}
