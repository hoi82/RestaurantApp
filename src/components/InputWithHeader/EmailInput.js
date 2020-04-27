import React from 'react';
import InputUI from './InputUI';
import Validator from "../../utils/Validator";

export default function EmailInput(props) {       
    return (
        <React.Fragment>
            <InputUI header="이메일" type="email" value={props.value} validator={Validator.validateEmail} onChange={props.onChange} forceUpdate={props.forceUpdate}/>
        </React.Fragment>
    );   
}

