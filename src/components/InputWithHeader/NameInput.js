import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function NameInput(props) {               
    return (
        <React.Fragment>
            <InputUI header="이름" type="text" value={props.value} validator={Validator.validateName} onChange={props.onChange} forceUpdate={props.forceUpdate}/>
        </React.Fragment>
    );    
}