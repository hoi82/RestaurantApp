export const CREATE_PAYMENT = "CREATE_PAYMENT";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const DELETE_PAYMENT = "DELETE_PAYMENT";
export const SELECT_PAYMENT = "SELECT_PAYMENT";

export const createPayment = (value) => {
    return {
        type: CREATE_PAYMENT,
        value: value
    }
}

export const updatePayment = (value) => {
    return {
        type: UPDATE_PAYMENT,        
        value: value
    }
}

export const selectPayment = (index) => {
    return {
        type: SELECT_PAYMENT,
        index: index
    }
}

export const deletePayment = (index) => {
    return {
        type: DELETE_PAYMENT,
        index: index
    }
}