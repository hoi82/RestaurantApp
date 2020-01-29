import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

class Login extends Component {
    render() {
        return (
            <div className={styles.login}>
                <div className={styles.box}>
                    <div className={styles.item_container}>
                        login logo
                    </div>
                    <div className={styles.item_container}>
                        <span className={styles.sub_title}>
                            이메일
                        </span>
                        <input type="email" className={styles.text_box}/>
                    </div>
                    <div className={styles.item_container}>
                        <span className={styles.sub_title}>
                            비밀번호
                        </span>
                        <input type="passowrd" className={styles.text_box}/>
                    </div>
                    <div className={styles.item_container}>
                        <div>
                            <input type="checkbox" className={styles.checkbox_actual}/>
                            <label className={styles.sub_title}>이메일 저장</label>                            
                        </div>
                        <button>
                            <span>이메일 / 비밀번호 찾기</span>
                        </button>
                    </div>
                    <div className={styles.item_container}>
                        <button>
                            <span>로그인</span>
                        </button>
                        <div>
                            <span className={styles.sub_title}>아직 가입하지 않으셨나요?</span>
                            <button>가입하기</button>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

export default Login;