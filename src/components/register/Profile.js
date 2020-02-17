import React, { Component } from 'react';
import PropTypes from "prop-types";
import Validator from "../common/Validator";
import styles from "./Profile.module.scss";

class Profile extends Component {
    constructor(props) {
        super(props);  

        this.state = {
            emailError : "",
            passwordError : "",
            nameError : "",
            phoneError : "",
            addrError : "",            
        }
    }    

    emailChange = (e) => {
        let value = e.target.value;        
        Validator.validateEmailCallback(value, (error) => {this.setState({emailError : error}, this.props.userInfoChange({email : value}))});        
    }

    passwordChange = (e) => {
        let value = e.target.value;
        Validator.validatePasswordCallback(value, (error) => {this.setState({passwordError : error}, this.props.userInfoChange({password : value}))});        
    }

    nameChange = (e) => {
        let value = e.target.value;
        Validator.validateNameCallback(value, (error) => {this.setState({nameError : error}, this.props.userInfoChange({name : value}))});        
    }

    phoneChange = (e) => {
        let value = e.target.value;
        Validator.validatePhoneNumberCallback(value, (error) => {this.setState({phoneError : error}, this.props.userInfoChange({phone : value}))});
    }

    addrChange = (e) => {
        let value = e.target.value;
        Validator.validateAddressCallback(value, (error) => {this.setState({addrError : error}, this.props.userInfoChange({address : value}))});
    }

    render() {
        return (
            <div className={styles.profile}>
                <div className={styles.panel}/>
                <div className={styles.container}>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>이메일</span>
                            <span className={styles.error_text}>{this.state.emailError}</span>
                        </div>                    
                        <input type="email" defaultValue={this.props.userInfo.email} onChange={this.emailChange}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>비밀번호</span>
                            <span className={styles.error_text}>{this.state.passwordError}</span>
                        </div>                                                                
                        <input type="password" defaultValue={this.props.userInfo.password} onChange={this.passwordChange}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>이름</span>
                            <span className={styles.error_text}>{this.state.nameError}</span>
                        </div>                    
                        <input type="text" defaultValue={this.props.userInfo.name} onChange={this.nameChange}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>연락처</span>
                            <span className={styles.error_text}>{this.state.phoneError}</span>
                        </div>                    
                        <input type="text" defaultValue={this.props.userInfo.phone} onChange={this.phoneChange}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>주소</span>
                            <span className={styles.error_text}>{this.state.addrError}</span>
                        </div>                    
                        <input type="text" defaultValue={this.props.userInfo.address} onChange={this.addrChange}/>
                    </div>
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