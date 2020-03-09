import React from 'react';
import ProfileInput from './ProfileInput';
import { useDispatch } from 'react-redux';
import { updatePassword, validatePassword } from '../../actions/register/profile';

export default function PasswordInput(props) {       
    const dispatch = useDispatch(); 

    const handleChange = (e) => {        
        let value = e.target.value.trim();
        dispatch(updatePassword(value));
    }    

    const handleBlur = (e) => {
        dispatch(validatePassword());   
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="비밀번호" type="password" value={props.password} error={props.error} onInput={handleChange} onBlur={handleBlur}/>
        </React.Fragment>
    );    
}