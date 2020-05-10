export const CREATE_PAYMENT = "CREATE_PAYMENT";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const DELETE_PAYMENT = "DELETE_PAYMENT";
export const SELECT_PAYMENT = "SELECT_PAYMENT";
export const UPDATE_CREDIT_FILED = "UPDATE_CREDIT_FILED";
export const UPDATE_PAYPAL_FILED = "UPDATE_PAYPAL_FIELD";
export const READY_TO_CHANGE = "READY_TO_CHANGE";
export const CHANGE_FAILED = "CHANGE_FAILED";
export const CHANGE_SUCCESS = "CHANGE_SUCCESS";

export const createPayment = (value) => {
    return {
        type: CREATE_PAYMENT,
        payload: value
    }
}

export const updatePayment = (value) => {
    return {
        type: UPDATE_PAYMENT,        
        payload: value
    }
}

export const selectPayment = (index) => {
    return {
        type: SELECT_PAYMENT,
        payload: index
    }
}

export const deletePayment = (index) => {
    return {
        type: DELETE_PAYMENT,
        payload: index
    }
}