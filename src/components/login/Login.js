import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { showDialog } from '../../actions/common/dialog';
import { DialogMode } from '../../data/Variables';
import { useDispatch } from 'react-redux';
import axios from "axios";

export default function Login(props) {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const dispatch = useDispatch();

    const sendInfoByEmail = () => {
        //DB에 일치하는 주소가 있으면 보내고
        //없으면 다이얼로그        
        // let sent = true;
        // if (sent) {            
        //     dispatch(showDialog({
        //         mode: DialogMode.SUCCESS,
        //         content: "입력하신 이메일 주소로 비밀번호를 전송했습니다."
        //     }));
        // }
        // else {            
        //     dispatch(showDialog({
        //         mode: DialogMode.ALERT,
        //         content: "가입되지 않은 이메일 주소입니다. \r\n이메일 주소를 확인해주세요."                
        //     }));
        // }        
    }

    const login = () => {     
        //sid있을 경우 메인으로 이동, 없으면 경고 팝업, 에러시 에러 팝업
        // axios.post(`http://localhost:3005/api/users/${email}/${password}/`, {
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     withCredentials: true
        // }).then((res) => {}).catch((err) => console.log(err));        
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
                        <img alt="로고" className={styles.logo}></img>                     
                    </div>
                    <div className={styles.item_container}>
                        <span className={styles.sub_title}>
                            이메일
                        </span>
                        <input type="email" className={styles.text_box} onChange={emailChanged} value={email} autoComplete="off"/>
                    </div>
                    <div className={styles.item_container}>
                        <span className={styles.sub_title}>
                            비밀번호
                        </span>
                        <input type="password" className={styles.text_box} onChange={passwordChanged} value={password} autoComplete="off"/>
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
        </div>            
    );    
};