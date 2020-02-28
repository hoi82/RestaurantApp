import React from 'react';
import ProfileInput from './ProfileInput';
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, validateProfile } from '../../actions/register';
import Validator from '../../data/Validator';

export default function EmailInput() {
    const email = useSelector((store) => store.register.email);
    const error = useSelector((store) => store.register.errors.email);
    const dispatch = useDispatch();

    const handleChange = (value) => {  
        dispatch(updateProfile({email : value}));                        
    }    

    const handleValidate = () => {
        dispatch(validateProfile("email"));
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="이메일" type="email" value={email} error={error} onChange={handleChange} onRefresh={handleValidate}/>
        </React.Fragment>
    );   
}

