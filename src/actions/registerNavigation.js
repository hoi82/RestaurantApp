export const NAVIGATE_ROOT = "NAVIGATE_ROOT";
export const NAVIGATE_PAYMENT = "NAVIGATE_PAYMENT";

export const navigateRoot = (page) => {
    return {
        type: NAVIGATE_ROOT,
        value: page,        
    }
}

export const navigatePayment = (page, hasParams = false, params = null) => {
    return {
        type: NAVIGATE_PAYMENT,
        value: page,
        hasParams: hasParams,
        params: params
    }
}