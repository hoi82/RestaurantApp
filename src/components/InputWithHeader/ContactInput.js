import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function ContactInput({value, onChange, forceUpdate}) {        
    return (
        <React.Fragment>
            <InputUI header="연락처" type="text" value={value} validator={Validator.validateContact} onChange={onChange} forceUpdate={forceUpdate}/>
        </React.Fragment>
    );    
}