import React from 'react';
import ProfileInput from './ProfileInput';
import { useDispatch } from 'react-redux';
import { updateAddress, validateAddress } from '../../actions/register/profile';

export default function AddressInput(props) {        
    const dispatch = useDispatch();

    const handleChange = (e) => {                
        let value = e.target.value.trim();
        dispatch(updateAddress(value));
    }

    const handleBlur = (e) => {
        dispatch(validateAddress());
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="주소" type="text" value={props.address} error={props.error} onInput={handleChange} onBlur={handleBlur}/>
        </React.Fragment>
    );    
}