import React from 'react';
import ProfileInput from './ProfileInput';
import { useDispatch } from 'react-redux';
import { updateContact, validateContact } from '../../actions/register/profile';

export default function ContactInput(props) {        
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
            <ProfileInput header="연락처" type="text" value={props.contact} error={props.error} onInput={handleChange} onBlur={handleBlur}/>
        </React.Fragment>
    );    
}