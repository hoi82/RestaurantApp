const Validator = {    

    validateEmail : (value) => {
        if (!emailRegex.test(value)) {
            return "이메일 주소가 올바르지 않습니다.";
        }
        else {
            return "";     
        }        
    },  
    
    /** 
     * @param {string} value - value to check
     * @param {function} messageCallback : callback function to save message
    */
    validateEmailCallback : (value, messageCallback) => {
        const message = Validator.validateEmail(value);

        runCallback(messageCallback, message);
    },
    
    validatePassword : (value) => {        
        let result = "";

        if (!(/[0-9]+/i.test(value)) || !(/[^a-z0-9]+/i.test(value))) {
            result = "비밀번호는 영문, 숫자, 기호 중 두가지 이상으로 이루어져야 합니다.";            
        }

        if ((value.length < 10) || (value.length > 16)) {
            result = "비밀번호의 길이는 10~16 입니다.";            
        }

        if (/(\w)\1\1/.test(value)) {
            result = "같은 문자를 3번 이상 연속으로 사용할 수 없습니다.";            
        }            

        return result;
    },

    /** 
     * @param {string} value - value to check
     * @param {function} messageCallback : callback function to save message
    */
    validatePasswordCallback : (value, messageCallback) => {
        const message = Validator.validatePassword(value);

        runCallback(messageCallback, message);
    },

    validateName : (value) => {
        if (!/[a-z0-9]+/i.test(value)) {
            return "필수 입력 항목입니다.";
        }
        else {
            return "";            
        }
    },

    /** 
     * @param {string} value - value to check
     * @param {function} messageCallback : callback function to save message
    */
    validateNameCallback : (value, messageCallback) => {
        const message = Validator.validateName(value);

        runCallback(messageCallback, message);
    },

    validatePhoneNumber : (value) => {
        if (!/[a-z0-9]+/i.test(value)) {
            return "필수 입력 항목입니다.";
        }
        else {
            return "";
        }
    },

    /** 
     * @param {string} value - value to check
     * @param {function} messageCallback : callback function to save message
    */
    validatePhoneNumberCallback : (value, messageCallback) => {
        const message = Validator.validatePhoneNumber(value);

        runCallback(messageCallback, message);
    },

    validateAddress : (value) => {
        if (!/[a-z0-9]+/i.test(value)) {
            return "필수 입력 항목입니다.";
        }
        else {
            return "";
        }
    },

    /** 
     * @param {string} value - value to check
     * @param {function} messageCallback : callback function to save message
    */
    validateAddressCallback : (value, messageCallback) => {
        const message = Validator.validateAddress(value);

        runCallback(messageCallback, message);
    }
}

const runCallback = (func, params) => {
    if ((func != null) && (typeof(func) == "function"))
            func(params);
}

const emailRegex = new RegExp("^[a-z0-9\_]{3,}\@[a-z0-9\_]{3,}\.[a-z0-9]+(\.[a-z0-9]+)?" , "i");

export default Validator;