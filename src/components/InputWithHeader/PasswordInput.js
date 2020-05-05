import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function PasswordInput({value, onChange, forceUpdate}) {           
    return (
        <React.Fragment>
            <InputUI header="비밀번호" type="password" value={value} validator={Validator.validatePassword} onChange={onChange} forceUpdate={forceUpdate}/>
        </React.Fragment>
    );    
}