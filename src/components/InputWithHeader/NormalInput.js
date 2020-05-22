import React from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';

export default function NormalInput({header, value, onChange, forceUpdate}) {
    return (
        <React.Fragment>
            <InputUI header={header} type="text" value={value} validator={Validator.validateText} onChange={onChange} forceUpdate={forceUpdate}/>
        </React.Fragment>
    );
}