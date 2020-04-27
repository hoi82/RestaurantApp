import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function PasswordInput(props) {           
    return (
        <React.Fragment>
            <InputUI header="비밀번호" type="password" value={props.value} validator={Validator.validatePassword} onChange={props.onChange} forceUpdate={props.forceUpdate}/>
        </React.Fragment>
    );    
}