import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function ContactInput(props) {        
    return (
        <React.Fragment>
            <InputUI header="연락처" type="text" value={props.value} validator={Validator.validateContact} onChange={props.onChange} forceUpdate={props.forceUpdate}/>
        </React.Fragment>
    );    
}