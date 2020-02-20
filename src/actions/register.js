export const UPDATE_REG_INFO = "UPDATE_REG_INFO";

export const updateInfo = (value) => {            
    return {
        type: UPDATE_REG_INFO,
        value: value
    };
}