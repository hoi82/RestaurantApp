import Validator from "../data/Validator";

class RegisterInfo {
    constructor() {
        this.email = "";
        this.password = "";
        this.name = "";
        this.contact = "";
        this.address = "";
        this.payments = [];
        this.errors = {
            email: "",
            password: "",
            name: "",
            contact: "",
            address: "",            
        }
        
        this.clone = this.clone.bind(this);                  
    }  
    
    init = () => {
        return new RegisterInfo();
    }

    validate = (field) => {        
        switch (field) {
            case "email":
                this.errors.email = Validator.validateEmail(this.email);
                break;   
            case "password":
                this.errors.password = Validator.validatePassword(this.password);
                break;
            case "name":
                this.errors.name = Validator.validateName(this.name);
                break;
            case "contact":
                this.errors.contact = Validator.validateContact(this.contact);
                break;
            case "address":
                this.errors.address = Validator.validateAddress(this.address);
                break;
            case "all":
                this.errors.email = Validator.validateEmail(this.email);
                this.errors.password = Validator.validatePassword(this.password);
                this.errors.name = Validator.validateName(this.name);
                this.errors.contact = Validator.validateContact(this.contact);
                this.errors.address = Validator.validateAddress(this.address);
                break;
            default:
                break;
        }
    }   
    
    clone = () => {        
        let obj = new RegisterInfo();

        obj.email = this.email;
        obj.password = this.password;
        obj.name = this.name;
        obj.contact = this.contact;
        obj.address = this.address;

        for (let i = 0; i < this.payments.length; i++) {
            const element = this.payments[i].clone();
            obj.payments.push(element);
        }

        obj.errors = Object.assign({}, this.errors);        
        return obj;      
    }
}

const regInitialState = new RegisterInfo();

export default regInitialState;
