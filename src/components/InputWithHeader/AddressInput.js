import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function AddressInput({value, onChange, forceUpdate}) {        
    return (
        <React.Fragment>
            <InputUI header="주소" type="text" value={value} validator={Validator.validateAddress} onChange={onChange} forceUpdate={forceUpdate}/>
        </React.Fragment>
    );    
}