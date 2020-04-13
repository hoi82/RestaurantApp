import React from 'react';
import ProfileInput from '../../../components/InputWithHeader/ProfileInput';
import { useDispatch } from "react-redux";
import { updateEmail, validateEmail } from '../../../actions/register/profile';

export default function EmailInput(props) {      
    const dispatch = useDispatch();

    const handleChange = (e) => {                
        let value = e.target.value.trim();
        dispatch(updateEmail(value));        
    }     
    
    const handleBlur = (e) => {
        dispatch(validateEmail());
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="이메일" type="email" value={props.email} error={props.error} onInput={handleChange} onBlur={handleBlur}/>
        </React.Fragment>
    );   
}

