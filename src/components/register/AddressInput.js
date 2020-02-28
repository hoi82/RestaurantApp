import React from 'react';
import ProfileInput from './ProfileInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, validateProfile } from '../../actions/register';
import Validator from '../../data/Validator';

export default function AddressInput() {    
    const address = useSelector((store) => store.register.address);
    const error = useSelector((store) => store.register.errors.address);
    const dispatch = useDispatch();

    const handleChange = (value) => {
        dispatch(updateProfile({address: value}));
    }

    const handleValidate = () => {
        dispatch(validateProfile("address"));
    }
    
    return (
        <React.Fragment>
            <ProfileInput header="주소" type="text" value={address} error={error} onChange={handleChange} onRefresh={handleValidate}/>
        </React.Fragment>
    );    
}