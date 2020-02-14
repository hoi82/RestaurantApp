import React, { Component } from 'react';
import PropTypes from "prop-types";
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

    emailRegex = new RegExp("^[a-z0-9\_]{3,}\@[a-z0-9\_]{3,}\.[a-z0-9]+(\.[a-z0-9]+)?" , "i");    

    emailChange = (e) => {
        let value = e.target.value;
        if (!this.emailRegex.test(value)) {
            this.setState({ emailError : "이메일 주소가 올바르지 않습니다." });
        }
        else {
            this.setState({ emailError : "" });            
        }
        this.props.userInfoChange({email : value});
    }

    passwordChange = (e) => {
        let value = e.target.value;
        let validated = true;        

        if (!(/[0-9]+/i.test(value)) || !(/[^a-z0-9]+/i.test(value))) {
            this.setState({ passwordError : "비밀번호는 영문, 숫자, 기호 중 두가지 이상으로 이루어져야 합니다."});
            validated = false;
        }

        if ((value.length < 10) || (value.length > 16)) {
            this.setState({ passwordError : "비밀번호의 길이는 10~16 입니다." });
            validated = false;            
        }

        if (/(\w)\1\1/.test(value)) {
            this.setState({ passwordError : "같은 문자를 3번 이상 연속으로 사용할 수 없습니다."});
            validated = false;
        }            

        if (validated) {
            this.setState({ passwordError : "" })            
        }
        this.props.userInfoChange({password : value});
    }

    nameChange = (e) => {
        let value = e.target.value;
        if (!/[a-z0-9]+/i.test(value)) {
            this.setState({ nameError : "필수 입력 항목입니다." });
        }
        else {
            this.setState({ nameChange : "" });            
        }
        this.props.userInfoChange({name : value});
    }

    phoneChange = (e) => {
        let value = e.target.value;
        if (!/[a-z0-9]+/i.test(value)) {
            this.setState({ phoneError : "필수 입력 항목입니다." });
        }
        else {
            this.setState({ phoneError : "" });            
        }
        this.props.userInfoChange({phone : value});
    }

    addrChange = (e) => {
        let value = e.target.value;
        if (!/[a-z0-9]+/i.test(value)) {
            this.setState({ addrError : "필수 입력 항목입니다."});        
        }
        else {
            this.setState({ addrError : "" });            
        }
        this.props.userInfoChange({address : value});
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