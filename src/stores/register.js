class RegisterInfo {
    constructor() {
        this.email = "";
        this.password = "";
        this.name = "";
        this.contact = "";
        this.address = "";
        this.payments = []
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