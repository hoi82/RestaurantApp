'use strict';
import ValidObject from "./ValidObject";

class UserInfo {
    constructor() {
        this.email = "";
        this.password = "";
        this.name = "";
        this.contact = "";
        this.address = "";
        this.payments = []
    }
}

export default UserInfo;