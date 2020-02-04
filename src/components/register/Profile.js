import React, { Component } from 'react';
import styles from "./Profile.module.scss";

class Profile extends Component {
    constructor(props) {
        super(props);        
    }    

    render() {
        return (
            <div className={styles.profile}>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>이메일</span>
                    <input type="email" onChange={ (e) => this.props.userInfoChange({ email : e.target.value })}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>비밀번호</span>
                    <input type="password" onChange={ (e) => this.props.userInfoChange({ password : e.target.value })}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>이름</span>
                    <input type="text" onChange={ (e) => this.props.userInfoChange({ name : e.target.value })}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>연락처</span>
                    <input type="text" onChange={ (e) => this.props.userInfoChange({ phone : e.target.value })}/>
                </div>
                <div className={styles.item_box}>
                    <span className={styles.item_header}>주소</span>
                    <input type="text" onChange={ (e) => this.props.userInfoChange({ address : e.target.value })}/>
                </div>
            </div>
        );
    }
}

export default Profile;