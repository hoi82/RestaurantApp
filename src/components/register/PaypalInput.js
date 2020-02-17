import React, { Component } from 'react';
import styles from "./PaypalInput.module.scss";
import close from "../../image/close.svg";

class PaypalInput extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content_container}>
                    <span>이메일</span>
                    <input type="email" placeholder="aaa@aaa.com"/>
                    <span>비밀번호</span>
                    <input type="password"/>
                </div>
                <button className={styles.add_btn}>
                    <span className={styles.add_btn_text}>저장하기</span>
                </button>
                <button className={styles.close_btn} onClick={ () => this.props.onBack("select")}>
                    <img src={close} className={styles.close_icon}/>
                </button>
            </div>
        );
    }
}

export default PaypalInput;