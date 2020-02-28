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
        console.log(field);
        console.log(this);
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
        console.log(this);
        let obj = new RegisterInfo();

        obj.email = this.email;
        obj.password = this.password;
        obj.name = this.name;
        obj.contact = this.contact;
        obj.address = this.address;

        obj.errors = Object.assign({}, this.errors);
        return obj;      
    }
}

const regInitialState = new RegisterInfo();

export default regInitialState;
