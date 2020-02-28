'use strict';
import ValidObject from "./ValidObject";

export default class UserInfo {
    constructor() {
        this.email = "";
        this.password = "";
        this.name = "";
        this.contact = "";
        this.address = "";
        this.payments = [];                
    }    
}