import { string } from "prop-types";

const emailRegex = new RegExp("^[a-z0-9\_]{3,}\@[a-z0-9\_]{3,}\.[a-z0-9]+(\.[a-z0-9]+)?" , "i");

const Validator = {    

    validateEmail : (value) => {
        if (value == undefined || value == null) {
            return "이메일 주소를 입력해 주세요."
        }

        if (value.trim() == "") {
            return "이메일 주소를 입력해 주세요."
        }

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
        
        if (value == undefined || value == null) {
            return "비밀번호를 입력해 주세요."
        }

        if (!(/[0-9]+/i.test(value)) || !(/[^a-z0-9]+/i.test(value))) {
            result = "비밀번호는 영문, 숫자, 기호 중 두가지 이상으로 이루어져야 합니다.";            
        }

        if ((value.length < 10) || (value.length > 16)) {
            result = "비밀번호의 길이는 10~16 입니다.";            
        }

        if (/(\w)\1\1/.test(value)) {
            result = "같은 문자를 3번 이상 연속으로 사용할 수 없습니다.";            
        }            

        if (value.trim() == "") {
            result = "비밀번호를 입력해 주세요."
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
        if (value == undefined || value == null) {
            return "이름을 입력해 주세요."
        }

        if (value.trim() == "") {
            return "이름을 입력해 주세요."
        }

        if (!(/^[a-z0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/i.test(value))) {
            return "특수 문자는 들어갈수 없습니다.";
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

    validateContact : (value) => {
        if (value == undefined || value == null) {
            return "연락처를 입력해 주세요."
        }

        if (value.trim() == "") {
            return "연락처를 입력해 주세요."
        }
        else {
            return "";
        }        
    },

    /** 
     * @param {string} value - value to check
     * @param {function} messageCallback : callback function to save message
    */
    validateContactCallback : (value, messageCallback) => {
        const message = Validator.validateContact(value);

        runCallback(messageCallback, message);
    },

    validateAddress : (value) => {
        if (value == undefined || value == null) {
            return "주소를 입력해 주세요."
        }

        if (value.trim() == "") {
            return "주소를 입력해 주세요.";
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
    },

    validateCreditNumber : (value) => {
        let val = value.trim().replace(/\D/g, "");        
        let exp = null;
        for (let i = 0; i < CreditCardInfo.Exps.length; i++) {
            exp = CreditCardInfo.Exps[i];
            if (exp.startWith.test(val) && CreditCardInfo.checkLuhn(val)) {                
                break;
            }
        }
        
        for (let i = 0; i < exp.width.length; i++) {
            if (val.length == exp.width[i])
                return { name : exp.name, error : ""};
        }        

        return { name : "", error: "올바르지 않은 카드 번호입니다."};
    },

    /** 
     * @param {string} value - value to check
     * @param {function} nameCallback : callback function to save card name if the number is right
    */
    validateCreditNumberCallback : (value, nameCallback) => {
        const name = Validator.validateCreditNumber(value);

        runCallback(nameCallback, name);
    },
    
    validateExpire : (value) => {
        let val = value.trim().replace(/[\D]/g, "");
        if (val.length != 4) {
            return "올바르지 않은 유효 기간입니다.";
        }
        else {
            const month = parseInt(val.slice(0,2));
            const year = parseInt(val.slice(2));            
            const now = new Date().getFullYear() % 100;
            if ((month > 12) || (year - now > 5) || (Math.abs(year - now) < 95)) {
                return "올바르지 않은 유효 기간입니다.";
            }
            else {
                return "";
            }
        }
    },

    /** 
     * @param {string} value - value to check
     * @param {function} messageCallback : callback function to save message
    */
    validateExpireCallback : (value, messageCallback) => {
        const message = Validator.validateExpire(value);

        runCallback(messageCallback, message);
    }
}

const runCallback = (func, ...params) => {
    if ((func != null) && (typeof(func) == "function"))
            func(...params);
}

const CreditCardInfo = {
    seperator : " ",
    checkLuhn : (value) => {        
        let nCheck = 0, bEven = false;
        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                  nDigit = parseInt(cDigit, 10);
    
            if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
    
            nCheck += nDigit;
            bEven = !bEven;
        }
    
        return (nCheck % 10) == 0;
    },

    Exps : [
        {
            name : "amex",
            startWith: /^(34|37)/,
            width: [15]
        },
        {
            name : "diners-carte",
            startWith: /^30[1-5]/,
            width: [14]
        },
        {
            name : "diners-int",
            startWith: /^36/,
            width: [14]
        },
        {
            name : "diners-uscan",
            startWith: /^54/,
            width: [16]
        },
        {
            name : "discover",
            startWith: /^(6011|622(12[6-9]|1[3-9]|[2-8]|9[0-1]|92[0-5])|64[4-9]|65)/,
            width: [16, 19]
        },
        {
            name : "insta",
            startWith: /^63[7-9]/,
            width: [16]
        },
        {
            name : "jcb",
            startWith: /^35(2[8-9]|[3-7]|8[0-9])/,
            width: [16, 19]
        },
        {
            name : "maestro",
            startWith: /^(5018|5020|5038|5893|6304|6759|676[1-3])/,
            width: [16,19]
        },
        {
            name : "master",
            startWith: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720[0-9])/,
            width: [16]
        },
        {
            name : "visa",
            startWith: /^4/,
            width: [13, 16, 19]
        },
        {
            name : "visa-e",
            startWith: /^(4026|417500|4508|4844|491[37])/,
            width: [16]
        },    
    ]    
}
    

export default Validator;