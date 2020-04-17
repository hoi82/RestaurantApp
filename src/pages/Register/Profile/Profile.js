import React from 'react';
import styles from "./Profile.module.scss";
import EmailInput from '../../../components/InputWithHeader/EmailInput';
import PasswordInput from '../../../components/InputWithHeader/PasswordInput';
import NameInput from '../../../components/InputWithHeader/NameInput';
import ContactInput from '../../../components/InputWithHeader/ContactInput';
import AddressInput from '../../../components/InputWithHeader/AddressInput';
import { useSelector } from 'react-redux';

export default function Profile() {
    const profile = useSelector((store) => store.register.profile)
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