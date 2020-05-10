import React, { useRef, useEffect } from 'react';
import Validator from '../../utils/Validator';
import Formatter from '../../utils/Formatter';
import { handleNumber } from './utils';
import InputUI from './InputUI';

export default function ExpireInput({value, onChange, forceUpdate}) {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.maxLength = 5;
        inputRef.current.autoComplete = "cc-exp";
        inputRef.current.placeholder = "MM/YY";
        inputRef.current.addEventListener("keydown", handleKeyDown);

        return () => {
            inputRef.current.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    const handleChange = (e) => {
        e.target.value = Formatter.formatExpireDate(e.target.value);
        if (onChange)
            onChange(e);
    }

    const handleKeyDown = (e) => {
        handleNumber(e);        
        const val = e.target.value.replace(/\D/g,"");
        
        if (val.length == 0) {
            if (e.key == "1" || e.key == "2") {
                return true;
            }
            else {

            }
        }
        else {

        } 
    }

    return (
        <React.Fragment>
            <InputUI header="만료일" type="text" value={value} validator={Validator.validateExpire} onChange={handleChange} forceUpdate={forceUpdate} ref={inputRef}/>
        </React.Fragment>
    );
}