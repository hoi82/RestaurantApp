import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function AddressInput(props) {        
    return (
        <React.Fragment>
            <InputUI header="주소" type="text" value={props.value} validator={Validator.validateAddress} onChange={props.onChange} forceUpdate={props.forceUpdate}/>
        </React.Fragment>
    );    
}