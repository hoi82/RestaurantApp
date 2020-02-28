import React from 'react';
import PropTypes from "prop-types";
import styles from "./Profile.module.scss";
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import NameInput from './NameInput';
import ContactInput from './ContactInput';
import AddressInput from './AddressInput';

export default function Profile() {            
    return (
        <div className={styles.profile}>
            <div className={styles.panel}/>
            <div className={styles.container}>
                <EmailInput/>
                <PasswordInput/>
                <NameInput/>
                <ContactInput/>
                <AddressInput/>
            </div>                
        </div>
    );
    
}

Profile.propTypes = {
    userInfo: PropTypes.object,
    userInfoChange: PropTypes.func
}