import React, { useRef, useEffect } from 'react';
import InputUI from './InputUI';
import Validator from '../../utils/Validator';
import { handleNumber } from './utils';

export default function CVCInput({value, onChange, forceUpdate}) {
    const inputref = useRef();

    useEffect(() => {
        inputref.current.maxLength = 3;
        inputref.current.autoComplete = "off";
        inputref.current.placeholder = "***";

        inputref.current.addEventListener("keydown", handleNumber);

        return () => {
            inputref.current.removeEventListener("keydown", handleNumber);
        };
    }, []);    

    return (
        <React.Fragment>
            <InputUI header="CVC" type="password" value={value} validator={Validator.validateCVC} onChange={onChange} forceUpdate={forceUpdate} ref={inputref}/>
        </React.Fragment>
    );
}