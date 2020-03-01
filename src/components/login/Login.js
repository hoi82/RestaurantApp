import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Dialog from "../common/Dialog";
import { DialogMode } from "../../data/Variables";
import styles from "./Login.module.scss";
import logo from "../../image/login.svg";

export default function Login() {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const dialogRef = useRef(null);

    const sendInfoByEmail = () => {
        //DB에 일치하는 주소가 있으면 보내고
        //없으면 다이얼로그

        let sent = false;
        if (sent) {
            dialogRef.current.showDialog(DialogMode.SUCCESS, "입력하신 이메일 주소로 비밀번호를 전송했습니다.")
        }
        else {
            dialogRef.current.showDialog(DialogMode.ALERT, "가입되지 않은 이메일 주소입니다.\r\n이메일 주소를 확인해주세요.");
        }        
    }

    const login = () => {
        let valid = false;
        if (valid) {

        }
        else {
            dialogRef.current.showDialog(DialogMode.ALERT, "존재하지 않는 이메일 주소이거나 잘못된 비밀번호입니다.\r\n이메일 주소 혹은 비밀번호를 확인해주세요.")
        }
    }    

    const emailChanged = (e) => {
        setEmail(e.target.value);
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value);
    }

    const remeberChanged = (e) => {
        setRemember(e.target.value);
    }
    
    return (        
        <div className={styles.login}>
            <div className={styles.login_container}>
                <div className={styles.box}>
                    <div className={styles.item_container}>
                        <img src={logo} alt="로고" className={styles.logo}></img>                     
                    </div>
                    <div className={styles.item_container}>
                        <span className={styles.sub_title}>
                            이메일
                        </span>
                        <input type="email" className={styles.text_box} onChange={emailChanged}/>
                    </div>
                    <div className={styles.item_container}>
                        <span className={styles.sub_title}>
                            비밀번호
                        </span>
                        <input type="password" className={styles.text_box} onChange={passwordChanged}/>
                    </div>
                    <div className={styles.item_container}>                        
                        <div className={styles.cbx_container}>
                            <input className={styles.ipx} id="cbx" type="checkbox" onChange={remeberChanged}/>
                            <label className={styles.cbx} htmlFor="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>                                            
                                    </svg>
                                </span>
                                <span className={styles.cbx_Text}>이메일 저장</span>
                            </label>                                
                        </div>
                        <button className={styles.link_btn} onClick={sendInfoByEmail}> 
                            <span className={styles.link_text}>이메일 / 비밀번호 찾기</span>
                        </button>
                    </div>
                    <div className={styles.item_container}>
                        <button className={styles.login_btn} onClick={login}>
                            <span>로그인</span>
                        </button>
                        <div>
                            <span className={styles.sub_title}>아직 가입하지 않으셨나요?</span>
                            <Link to={"/register"}>
                                <button className={styles.register_btn}>                                
                                    <span className={styles.link_text}>가입하기</span>
                                </button>
                            </Link>                            
                        </div>
                    </div>
                </div>                
            </div>
            <Dialog ref={dialogRef}></Dialog>
        </div>            
    );    
}