import React from 'react';
import ProfileInput from './ProfileInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, validateProfile } from '../../actions/register';
import Validator from '../../data/Validator';

export default function NameInput() {   
    const name = useSelector((store) => store.register.name);
    const error = useSelector((store) => store.register.errors.name);
    const dispatch = useDispatch(); 

    const handleChange = (value) => {
        dispatch(updateProfile({name: value}));        
    }

    const handleValidate = () => {
        dispatch(validateProfile("name"));
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="이름" type="text" value={name} error={error} onChange={handleChange} onRefresh={handleValidate}/>
        </React.Fragment>
    );    
}