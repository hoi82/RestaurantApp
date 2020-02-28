import React from 'react';
import ProfileInput from './ProfileInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, validateProfile } from '../../actions/register';
import Validator from '../../data/Validator';

export default function ContactInput() {    
    const contact = useSelector((store) => store.register.contact);
    const error = useSelector((store) => store.register.errors.contact);
    const dispatch = useDispatch();

    const handleChange = (value) => {
        dispatch(updateProfile({contact: value}));
    }

    const handleValidate = () => {
        dispatch(validateProfile("contact"));
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="연락처" type="text" value={contact} error={error} onChange={handleChange} onRefresh={handleValidate}/>
        </React.Fragment>
    );    
}