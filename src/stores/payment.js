import { Payments } from "../data/Variables";
import Validator from "../data/Validator";

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
        
        this.error = {
            type: "",
            number: "필수 입력 항목입니다.",
            expire: "필수 입력 항목입니다.",
            cvc: "필수 입력 항목입니다."                
        };
    }

    clone = () => {
        const obj = new CreditCardInfo();

        obj.type = this.type;
        obj.number = this.number;
        obj.expire = this.expire;
        obj.cvc = this.cvc;

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
        if (this.cvc == "") {
            this.error.cvc = "필수 입력 항목입니다.";
        }
        else {
            this.error.cvc = "";
        }
    }

    validateAll = () => {
        this.validateNumber();
        this.validateExpire();
        this.validateCVC();
    }

    get valid() {
        return (this.type != "") && (this.error.number == "") && (this.error.expire == "") && (this.error.cvc == "");
    }
}

class PaypalInfo {
    constructor() {
        this.email = "";
        this.password = "";

        this.error = {
            email: "필수 입력 항목입니다.",
            password: "필수 입력 항목입니다.",
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
        if (this.password == "") {
            this.error.password = "필수 입력 항목입니다.";
        }
        else {
            this.error.password = "";
        }
    }

    validateAll = () => {
        this.validateEmail();
        this.validatePassword();
    }

    get valid() {
        return (this.error.email == "") && (this.error.password == "");
    }
}

export default PaymentInfo;