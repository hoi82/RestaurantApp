import React from 'react';
import ProfileInput from './ProfileInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, validateProfile } from '../../actions/register';
import Validator from '../../data/Validator';

export default function PasswordInput() {   
    const password = useSelector((store) => store.register.password);
    const error = useSelector((store) => store.register.errors.password);
    const dispatch = useDispatch(); 

    const handleChange = (value) => {
        dispatch(updateProfile({password: value}));        
    }

    const handleValidate = () => {
        dispatch(validateProfile("password"));
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="비밀번호" type="password" value={password} error={error} onChange={handleChange} onRefresh={handleValidate}/>
        </React.Fragment>
    );    
}