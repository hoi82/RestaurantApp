export const UPDATE_PAYPAL_EMAIL = "UPDATE_PAYPAL_EMAIL";
export const UPDATE_PAYPAL_PASSWORD = "UPDATE_PAYPAL_PASSWORD";
export const ASSIGN_PAYPAL = "ASSIGN_PAYPAL";
export const NEW_PAYPAL = "NEW_PAYPAL";

export const updateEmail = (value) => {
    return {
        type: UPDATE_PAYPAL_EMAIL,
        payload: value
    }
}

export const updatePassword = (value) => {
    return {
        type: UPDATE_PAYPAL_PASSWORD,
        payload: value
    }
}

export const assignPaypal = (paypal) => {
    return {
        type: ASSIGN_PAYPAL,
        payload: paypal
    }
}

export const newPaypal = () => {
    return {
        type: NEW_PAYPAL,
    }
}