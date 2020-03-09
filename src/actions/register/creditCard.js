export const UPDATE_NUMBER = "UPDATE_NUMBER";
export const UPDATE_EXPIRE = "UPDATE_EXPIRE";
export const UPDATE_CVC = "UPDATE_CVC";
export const UPDATE_CASHHOLDER = "UPDATE_CASHHOLDER";
export const VALIDATE_NUMBER = "VALIDATE_NUMBER";
export const VALIDATE_EXPIRE = "VALIDATE_EXPIRE";
export const VALIDATE_CVC = "VALIDATE_CVC";
export const VALIDATE_CASHHOLDER = "VALIDATE_CASHHOLDER";
export const REFRESH_CREDIT_CARD = "REFRESH_CREDIT_CARD";
export const ASSIGN_CREDIT_CARD = "ASSIGN_CREDIT_CARD";
export const NEW_CREDIT_CARD = "NEW_CREDIT_CARD";

export const updateNumber = (value) => {
    return {
        type: UPDATE_NUMBER,
        value: value
    }
}

export const updateExpire = (value) => {
    return {
        type: UPDATE_EXPIRE,
        value: value
    }
}

export const updateCVC = (value) => {
    return {
        type: UPDATE_CVC,
        value: value
    }
}

export const updateCashHolder = (value) => {
    return {
        type:UPDATE_CASHHOLDER,
        value: value
    }
}

export const validateNumber = () => {
    return {
        type:VALIDATE_NUMBER
    }
}

export const validateExpire = () => {
    return {
        type: VALIDATE_EXPIRE
    }
}

export const validateCVC = () => {
    return {
        type: VALIDATE_CVC
    }
}

export const validateCashHolder = () => {
    return {
        type: VALIDATE_CASHHOLDER
    }
}

export const refreshCredit = () => {    
    return {
        type: REFRESH_CREDIT_CARD
    }
}

export const assignCredit = (credit) => {
    return {
        type: ASSIGN_CREDIT_CARD,
        value: credit
    }
}

export const newCreditCard = () => {
    return {
        type: NEW_CREDIT_CARD
    }
}