import React, { Component } from 'react';
import PropTypes from "prop-types";
import Validator from "../../data/Validator";
import styles from "./Profile.module.scss";
import EmailInput from './EmailInput';

class Profile extends Component {
    constructor(props) {
        super(props);                    
    }        

    render() {                
        return (
            <div className={styles.profile}>
                <div className={styles.panel}/>
                <div className={styles.container}>
                    <EmailInput/>
                </div>                
            </div>
        );
    }
}

Profile.propTypes = {
    userInfo: PropTypes.object,
    userInfoChange: PropTypes.func
}

export default Profile;