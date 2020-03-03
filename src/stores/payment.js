import { Payments } from "../data/Variables";
import Validator from "../data/Validator";
import { ErrorMessages } from "../data/ErrorMessages";

class PaymentInfo {
    constructor(kind) {
        this.kind = kind;
        this.detail = new PaymentDetail();        
    }

    clone = () => {
        let obj = new PaymentInfo();
        obj.kind = this.kind;
        obj.detail = this.detail.clone();        

        return obj;
    }    

    get valid() {
        switch (this.kind) {
            case Payments.CREDIT_CARD:                                
                return this.detail.creditCard.valid;
            case Payments.PAYPAL:
                return this.detail.paypal.valid;
            default:
                return false;
        }
    }
}

class PaymentDetail {
    constructor() {
        this.creditCard = new CreditCardInfo();
        this.paypal = new PaypalInfo();
    }

    clone = () => {
        const obj = new PaymentDetail();
        obj.creditCard = this.creditCard.clone();
        obj.paypal = this.paypal.clone();

        return obj;
    }
}

class CreditCardInfo {
    constructor() {
        this.type = "";
        this.number = "";
        this.expire = "";
        this.cvc = ""; 
        this.name = ""; 
        
        this.error = {
            type: "",
            number: ErrorMessages.EMPTY_CARD_NUMBER,
            expire: ErrorMessages.EMPTY_EXPIRE_DATE,
            cvc: ErrorMessages.EMPTY_CVC,
            name: ErrorMessages.EMPTY_NAME,
        };
    }

    clone = () => {
        const obj = new CreditCardInfo();

        obj.type = this.type;
        obj.number = this.number;
        obj.expire = this.expire;
        obj.cvc = this.cvc;
        obj.name = this.name;

        Object.assign(obj.error, this.error);

        return obj;
    }

    validateNumber = () => {
        let result = Validator.validateCreditNumber(this.number);             
        this.type = result.name;
        this.error.number = result.error;        
    }

    validateExpire = () => {
        this.error.expire = Validator.validateExpire(this.expire);
    }

    validateCVC = () => {
        this.error.cvc = Validator.validateCVC(this.cvc);
    }

    validateName = () => {
        this.error.name = Validator.validateName(this.name);
    }

    validateAll = () => {
        this.validateNumber();
        this.validateExpire();
        this.validateCVC();  
        this.validateName();      
    }

    get valid() {
        return (this.type != "") && (this.error.number == ErrorMessages.CORRECT) && 
        (this.error.expire == ErrorMessages.CORRECT) && (this.error.cvc == ErrorMessages.CORRECT)
        && (this.error.name == ErrorMessages.CORRECT);
    }
}

class PaypalInfo {
    constructor() {
        this.email = "";
        this.password = "";

        this.error = {
            email: ErrorMessages.EMPTY_EMAIL,
            password: ErrorMessages.EMPTY_PASSWORD,
        }
    }

    clone = () => {
        const obj = new PaypalInfo();

        obj.email = this.email;
        obj.password = this.password;
        Object.assign(obj.error, this.error);

        return obj;
    }

    validateEmail = () => {
        this.error.email = Validator.validateEmail(this.email);
    }

    validatePassword = () => {
        this.error.password = Validator.validateExternalPassword(this.password);
    }

    validateAll = () => {
        this.validateEmail();
        this.validatePassword();
    }

    get valid() {
        return (this.error.email == ErrorMessages.CORRECT) && (this.error.password == ErrorMessages.CORRECT);
    }
}

export default PaymentInfo;