import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function ExternalPasswordInput({value, onChange, forceUpdate}) {           
    return (
        <React.Fragment>
            <InputUI header="비밀번호" type="password" value={value} validator={Validator.validateExternalPassword} onChange={onChange} forceUpdate={forceUpdate}/>
        </React.Fragment>
    );    
}