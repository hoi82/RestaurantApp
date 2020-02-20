'use strict';
import ValidObject from "./ValidObject";
import Validator from "./Validator";

class ValidUserInfo {
    constructor() {
        this._email = new ValidObject("", Validator.validateEmailCallback);
        this._password = new ValidObject("", Validator.validatePasswordCallback);
        this._name = new ValidObject("", Validator.validateNameCallback);
        this._contact = new ValidObject("", Validator.validateContactCallback);
        this._address = new ValidObject("", Validator.validateAddressCallback);
        this._payments = [];        
    }

    get email() {
        return this._email.value;
    }

    set email(value) {
        this._email.value = value;
    }

    get password() {
        return this._password.value;
    }

    set password(value) {
        this._password.value = value;
    }

    get name() {
        return this._name.value;
    }

    set name(value) {
        this._name.value = value;
    }

    get contact() {
        return this._contact.value;
    }

    set contact(value) {
        this._contact.value = value;
    }

    get address() {
        return this._address.value;
    }

    set address(value) {
        this._address.value = value;
    }

    get payments() {
        return this._payments;
    }

    get errors() {
        return {
            email: this._email.error,
            password: this._password.error,
            name: this._name.error,
            contact: this._contact.error,
            address: this._address.error,            
        };
    }

    validateAll = () => {
        this._email.validate();
        this._password.validate();
        this._name.validate();
        this._contact.validate();
        this._address.validate();
    }

    get valid() {
        return this._email.valid && this._password.valid && this._name.valid && this._contact.valid && this._address.valid;
    }
}

export default ValidUserInfo;