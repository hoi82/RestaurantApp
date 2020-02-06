import React, { Component } from 'react';
import styles from "./Profile.module.scss";

class Profile extends Component {
    constructor(props) {
        super(props);        
    }    

    handleChange = (value) => {
        Object.assign(this.props.userInfo, value);
    }

    render() {
        return (
            <div className={styles.profile}>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>이메일</span>
                    {/* <input type="email" onChange={ (e) => this.props.userInfoChange({ email : e.target.value })}/> */}
                    <input type="email" onChange={ (e) => {this.handleChange({email : e.target.value})}}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>비밀번호</span>
                    <input type="password" onChange={ (e) => {this.handleChange({password : e.target.value})}}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>이름</span>
                    <input type="text" onChange={ (e) => {this.handleChange({name : e.target.value})}}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>연락처</span>
                    <input type="text" onChange={ (e) => {this.handleChange({phone : e.target.value})}}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>주소</span>
                    <input type="text" onChange={ (e) => {this.handleChange({address : e.target.value})}}/>
                </div>
            </div>
        );
    }
}

export default Profile;