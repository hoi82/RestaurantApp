export const UPDATE_NUMBER = "UPDATE_NUMBER";
export const UPDATE_EXPIRE = "UPDATE_EXPIRE";
export const UPDATE_CVC = "UPDATE_CVC";
export const UPDATE_CASHHOLDER = "UPDATE_CASHHOLDER";
export const ASSIGN_CREDIT_CARD = "ASSIGN_CREDIT_CARD";
export const NEW_CREDIT_CARD = "NEW_CREDIT_CARD";

export const updateNumber = (value) => {
    return {
        type: UPDATE_NUMBER,
        payload: value
    }
}

export const updateExpire = (value) => {
    return {
        type: UPDATE_EXPIRE,
        payload: value
    }
}

export const updateCVC = (value) => {
    return {
        type: UPDATE_CVC,
        payload: value
    }
}

export const updateCashHolder = (value) => {
    return {
        type:UPDATE_CASHHOLDER,
        payload: value
    }
}

export const assignCredit = (credit) => {
    return {
        type: ASSIGN_CREDIT_CARD,
        payload: credit
    }
}

export const newCreditCard = () => {
    return {
        type: NEW_CREDIT_CARD
    }
}