'use strict';

class ValidObject {
    constructor(validator) {
        this._val = null;        
        this._error = "";
        this._validator = validator;
    }    

    get value() {
        return this._val;
    }

    set value(value) {
        this._val = value;
        if ((this._validator != undefined) && (this._validator != null)) {
            this._validator(value, (error) => { this._error = error });
        }
    }

    get valid() {
        return this._error == "";
    }

    get error() {
        return this._error;
    }

    validate = () => {        
        if ((this._validator != undefined) && (this._validator != null)) {
            this._validator(this._val, (error) => { this._error = error });
        }
    }
}

export default ValidObject;