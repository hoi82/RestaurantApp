export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const VALIDATE_EMAIL = "VALIDATE_EMAIL";
export const VALIDATE_PASSWORD = "VALIDATE_PASSWORD";
export const ASSIGN_PAYPAL = "ASSIGN_PAYPAL";
export const NEW_PAYPAL = "NEW_PAYPAL";
export const REFRESH_PAYPAL = "REFRESH_PAYPAL";

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

export const validateEmail = () => {
    return {
        type: VALIDATE_EMAIL,        
    }
}

export const validatePassword = () => {
    return {
        type: VALIDATE_PASSWORD,
    }
}

export const assignPaypal = (paypal) => {
    return {
        type: ASSIGN_PAYPAL,
        value: paypal
    }
}

export const newPaypal = () => {
    return {
        type: NEW_PAYPAL,
    }
}

export const refreshPaypal = () => {
    return {
        type: REFRESH_PAYPAL,
    }
}