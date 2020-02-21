class RegisterInfo {
    constructor() {
        this.email = "";
        this.password = "";
        this.name = "";
        this.contact = "";
        this.address = "";
        this.payments = [];
        this.init = this.init.bind(this);
    }  
    
    init = () => {
        this.email = "";
        this.password = "";
        this.name = "";
        this.contact = "";
        this.address = "";
        this.payments = [];
        console.log(this);
    }
}

// const regInitialState = {    
//     email : "",
//     password: "",
//     name: "",
//     contact: "",
//     address: ""
// }

const regInitialState = new RegisterInfo();

export default regInitialState;