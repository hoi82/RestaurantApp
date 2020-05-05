import React from 'react';
import InputUI from './InputUI';
import Validator from "../../utils/Validator";

export default function EmailInput({value, onChange, forceUpdate}) {       
    return (
        <React.Fragment>
            <InputUI header="이메일" type="email" value={value} validator={Validator.validateEmail} onChange={onChange} forceUpdate={forceUpdate}/>
        </React.Fragment>
    );   
}

