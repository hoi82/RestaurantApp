import React from 'react';
import styles from "./Profile.module.scss";
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import NameInput from './NameInput';
import ContactInput from './ContactInput';
import AddressInput from './AddressInput';
import { useSelector } from 'react-redux';

export default function Profile() {
    const profile = useSelector((store) => store.profile)
    return (
        <div className={styles.profile}>
            <div className={styles.panel}/>
            <div className={styles.container}>
                <EmailInput email={profile.email} error={profile.emailError}/>
                <PasswordInput password={profile.password} error={profile.passwordError}/>
                <NameInput name={profile.name} error={profile.nameError}/>
                <ContactInput contact={profile.contact} error={profile.contactError}/>
                <AddressInput address={profile.address} error={profile.addressError}/>
            </div>                
        </div>
    );    
}