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
        
        if (this.props.userInfo.errors) {
            this.injectErrors(props.userInfo.errors);
        }

        console.log("const");
    }    

    injectErrors = (errors) => {
        this.state.emailError = errors.email;
        this.state.passwordError = errors.password;
        this.state.nameError = errors.name;
        this.state.phoneError = errors.phone;
        this.state.addrError = errors.address;
    }

    emailChange = (e) => {
        let value = e.target.value.trim();
        this.props.userInfoChanges.email(value); 
        this.setState({emailError : ""});          
        e.target.data = e.target.value;   
    }

    emailBlur = (e) => {
        if (e.target.data != undefined) {
            this.emailChange(e);
            this.setState({emailError : this.props.userInfo.errors.email});
        }        
    }

    passwordChange = (e) => {
        let value = e.target.value.trim();
        this.props.userInfoChanges.password(value);
        this.setState({passwordError : ""});   
        e.target.data = e.target.value;        
    }

    passwordBlur = (e) => {
        if (e.target.data != undefined) {
            this.setState({passwordError : this.props.userInfo.errors.password});
        }                
    }

    nameChange = (e) => {
        let value = e.target.value.trim();
        this.props.userInfoChanges.name(value);
        this.setState({nameError : ""});
        e.target.data = e.target.value;        
    }

    nameBlur = (e) => {
        if (e.target.data != undefined) {
            this.setState({nameError : this.props.userInfo.errors.name});
        }
    }

    phoneChange = (e) => {
        let value = e.target.value.trim();
        this.props.userInfoChanges.phone(value);
        this.setState({phoneError : ""});   
        e.target.data = e.target.value;
    }

    phoneBlur = (e) => {
        if (e.target.data != undefined) {
            this.setState({phoneError : this.props.userInfo.errors.phone});
        }
    }

    addrChange = (e) => {
        let value = e.target.value.trim();
        this.props.userInfoChanges.addr(value);
        this.setState({addrError : ""});
        e.target.data = e.target.value;
    }    

    addrBlur = (e) => {
        if (e.target.data != undefined) {
            this.setState({addrError : this.props.userInfo.errors.address});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {          
        this.injectErrors(nextProps.userInfo.errors);
        return true;
    }

    render() {        
        // this.state.emailError = this.props.userInfo.errors.email;
        return (
            <div className={styles.profile}>
                <div className={styles.panel}/>
                <div className={styles.container}>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>이메일</span>
                            <span className={styles.error_text}>{this.state.emailError}</span>
                        </div>                    
                        <input type="email" defaultValue={this.props.userInfo.email} onChange={this.emailChange} onBlur={this.emailBlur}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>비밀번호</span>
                            <span className={styles.error_text}>{this.state.passwordError}</span>
                        </div>                                                                
                        <input type="password" defaultValue={this.props.userInfo.password} maxLength="16" onChange={this.passwordChange} onBlur={this.passwordBlur}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>이름</span>
                            <span className={styles.error_text}>{this.state.nameError}</span>
                        </div>                    
                        <input type="text" defaultValue={this.props.userInfo.name} maxLength="16" onChange={this.nameChange} onBlur={this.nameBlur}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>연락처</span>
                            <span className={styles.error_text}>{this.state.phoneError}</span>
                        </div>                    
                        <input type="text" defaultValue={this.props.userInfo.phone} onChange={this.phoneChange} onBlur={this.phoneBlur}/>
                    </div>
                    <div className={styles.item_box}>
                        <div className={styles.header_box}>
                            <span className={styles.item_header}>주소</span>
                            <span className={styles.error_text}>{this.state.addrError}</span>
                        </div>                    
                        <input type="text" defaultValue={this.props.userInfo.address} onChange={this.addrChange} onBlur={this.addrBlur}/>
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