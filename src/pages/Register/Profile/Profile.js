import React, { useState, useEffect } from 'react';
import styles from "./Profile.module.scss";
import EmailInput from '../../../components/InputWithHeader/EmailInput';
import PasswordInput from '../../../components/InputWithHeader/PasswordInput';
import NameInput from '../../../components/InputWithHeader/NameInput';
import ContactInput from '../../../components/InputWithHeader/ContactInput';
import AddressInput from '../../../components/InputWithHeader/AddressInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword, updateName, updateContact, updateAddress } from '../../../actions/register/profile';
import { REGISTER_FAILED } from '../../../actions/register/status';

export default function Profile() {        
    const profile = useSelector((store) => store.register.profile);
    const status = useSelector((store) => store.register.status);
    const [forceUpdate, setForceUpdate] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {        
        if (status.status == REGISTER_FAILED)
            setForceUpdate(true);
    }, [status]);

    const handleEmail = (e) => {
        dispatch(updateEmail(e.target.value));
    }    

    const handlePassword = (e) => {
        dispatch(updatePassword(e.target.value));
    }

    const handleName = (e) => {
        dispatch(updateName(e.target.value));
    }

    const handleContact = (e) => {
        dispatch(updateContact(e.target.value));
    }

    const handleAddress = (e) => {
        dispatch(updateAddress(e.target.value));
    }

    return (
        <div className={styles.profile}>
            <div className={styles.panel}/>
            <div className={styles.container}>
                <EmailInput value={profile.email} forceUpdate={forceUpdate} onChange={handleEmail}/>
                <PasswordInput value={profile.password} forceUpdate={forceUpdate} onChange={handlePassword}/>
                <NameInput value={profile.name} forceUpdate={forceUpdate} onChange={handleName}/>
                <ContactInput value={profile.contact} forceUpdate={forceUpdate} onChange={handleContact}/>
                <AddressInput value={profile.address} forceUpdate={forceUpdate} onChange={handleAddress}/>
            </div>                
        </div>
    );    
}