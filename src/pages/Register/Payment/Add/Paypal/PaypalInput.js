import React from 'react';
import styles from "./PaypalInput.module.scss";
import close from "../../../../../image/close.svg";
import { ErrorMessages } from '../../../../../types/ErrorMessages';

export default function PaypalInput(props) {
    const toggleInputClass = (error) => {
        if (error == ErrorMessages.CORRECT) {
            return styles.normal_input;
        }
        else {
            return styles.error_input;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content_container}>
                <span>이메일</span>
                <input name="email" type="email" placeholder="aaa@aaa.com" autoComplete="off" className={toggleInputClass(props.emailError)} value={props.email} onChange={props.functions.change} onBlur={props.functions.blur}/>
                <span className={styles.error_text}>{props.emailError}</span>
            </div>
            <div className={styles.content_container}>
                <span>비밀번호</span>
                <input name="password" type="password" className={toggleInputClass(props.passwordError)} value={props.password} onChange={props.functions.change} onBlur={props.functions.blur}/>
                <span className={styles.error_text}>{props.passwordError}</span>
            </div>
            <button className={styles.add_btn} onClick={props.edit ? props.functions.edit : props.functions.add}>
                <span className={styles.add_btn_text}>
                    {props.edit ? "저장하기" : "추가하기"}
                </span>
            </button>
            <button className={styles.close_btn} onClick={props.functions.close}>
                <img src={close} className={styles.close_icon}/>
            </button>
        </div>
    );    
}