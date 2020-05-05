import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function NameInput({value, onChange, forceUpdate}) {               
    return (
        <React.Fragment>
            <InputUI header="이름" type="text" value={value} validator={Validator.validateName} onChange={onChange} forceUpdate={forceUpdate}/>
        </React.Fragment>
    );    
}