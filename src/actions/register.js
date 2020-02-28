export const UPDATE_REG_PROFILE = "UPDATE_REG_PROFILE";
export const VALIDATE_FIELD_REG = "VALIDATE_FIELD_REG";
export const VALIDATE_ALL_REG = "VALIDATE_ALL_REG";
export const INIT_REG = "INIT_REG";
export const ADD_REG_PAYMENT = "ADD_REG_PAYMENT";
export const UPDATE_REG_PAYMENT = "UPDATE_REG_PAYMENT";

export const updateProfile = (value) => {    
    return {
        type: UPDATE_REG_PROFILE,
        value: value
    };
}

export const validateProfile = (field) => {
    return {
        type: VALIDATE_FIELD_REG,
        value: field        
    }
}

export const validateAllProfile = () => {
    return {
        type: VALIDATE_ALL_REG,        
    }
}

export const initInfo = () => {    
    return {
        type: INIT_REG,
    }
}

export const addPayment = (value) => {
    return {
        type: ADD_REG_PAYMENT,
        value: value
    }
}

export const updatePayment = (index, value) => {
    return {
        type: UPDATE_REG_PAYMENT,
        index: index,
        value: value
    }
}