import React from 'react';
import ProfileInput from './ProfileInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateContact, validateContact } from '../../actions/register/profile';

export default function ContactInput() {    
    const contact = useSelector((store) => store.profile.contact);    
    const error = useSelector((store) => store.profile.contactError);    
    const dispatch = useDispatch();

    const handleChange = (e) => {                
        let value = e.target.value.trim();
        dispatch(updateContact(value));
    }

    const handleBlur = (e) => {        
        dispatch(validateContact());
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="연락처" type="text" value={contact} error={error} onInput={handleChange} onBlur={handleBlur}/>
        </React.Fragment>
    );    
}