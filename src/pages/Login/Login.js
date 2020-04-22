import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import global from "../../theme/global.scss";
import { useDispatch } from 'react-redux';
import { LogIn } from '../../actions/auth';
import NavPanel from "../../components/NavPanel"
import { endpoint } from '../../config/url';
import StyledCheckBox from '../../components/StyledCheckBox';

export default function Login(props) {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const dispatch = useDispatch();    

    const sendInfoByEmail = () => {
           
    }    

    const handleLogIn = () => {             
        dispatch(LogIn(email, password));              
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
            <NavPanel width={global.log_in_nav_width}>
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
                        <StyledCheckBox onChange={remeberChanged} title={"이메일 저장"}/>
                        <button className={styles.link_btn} onClick={sendInfoByEmail}> 
                            <span>이메일 / 비밀번호 찾기</span>
                        </button>
                    </div>
                    <div className={styles.item_container}>
                        <button className={styles.login_btn} onClick={handleLogIn}>
                            <span>로그인</span>
                        </button>
                        <div>
                            <span className={styles.sub_title}>아직 가입하지 않으셨나요?</span>
                            <Link to={endpoint.register}>
                                <button className={styles.register_btn}>                                
                                    <span>가입하기</span>
                                </button>
                            </Link>                            
                        </div>
                    </div>
                </div>                
            </NavPanel>         
        </div>            
    );    
};