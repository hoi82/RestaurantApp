import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.scss";
import global from "../../theme/global.scss";
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, LOG_IN_SUCCESS, LOG_IN_FAILED } from '../../actions/auth';
import NavPanel from "../../components/NavPanel"
import { endpoint } from '../../config/url';
import StyledCheckBox from '../../components/StyledCheckBox';
import EmailInput from '../../components/InputWithHeader/EmailInput';
import PasswordInput from '../../components/InputWithHeader/PasswordInput';
import Validator from '../../utils/Validator';
import { ErrorMessages } from '../../types/ErrorMessages';
import { showDialog } from '../../actions/common/dialog';
import { DialogMode } from '../../types/Variables';

export default function Login({location}) { 
    const auth = useSelector((store) => store.auth);      
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();    

    useEffect(() => {        
        if (auth.state == LOG_IN_SUCCESS) {
            if (location.state) {
                
            }
            history.push(endpoint.home);
        }
        else if (auth.state == LOG_IN_FAILED) {
            dispatch(showDialog({
                mode: DialogMode.ALERT,
                content: "회원 정보가 올바르지 않습니다."
            }))
        }
    }, [auth]);

    const sendInfoByEmail = () => {
           
    }

    const handleLogIn = () => {        
        setForceUpdate(true);
        if (Validator.validateEmail(email) == ErrorMessages.CORRECT && Validator.validatePassword(password) == ErrorMessages.CORRECT) {            
            dispatch(LogIn(email, password));
        }            
    }    

    const emailChanged = (e) => {
        setEmail(e.target.value);
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value);
    }

    const remeberChanged = (e) => {
        setRemember(e.target.checked);
    }    
    
    return (        
        <div className={styles.login}>
            <NavPanel width={global.log_in_nav_width}>
                <div className={styles.box}>
                    <div className={styles.item_container}>
                        <img alt="로고" className={styles.logo}></img>                     
                    </div>
                    <div className={styles.item_container}>
                        <EmailInput value={email} forceUpdate={forceUpdate} onChange={emailChanged}/>
                    </div>
                    <div className={styles.item_container}>
                        <PasswordInput value={password} forceUpdate={forceUpdate} onChange={passwordChanged}/>
                    </div>                                                            
                    <div className={styles.item_container}>                                                
                        <StyledCheckBox onChange={remeberChanged} checked={remember} title={"이메일 저장"}/>
                        <button className={styles.link_btn} onClick={sendInfoByEmail}> 
                            <span>이메일 / 비밀번호 찾기</span>
                        </button>
                    </div>
                    <div className={styles.item_container}>
                        <button className={styles.login_btn} onClick={handleLogIn}>
                            <span>로그인</span>
                        </button>
                        <div className={styles.register_container}>
                            <span className={styles.sub_title}>아직 가입하지 않으셨나요?</span>
                            <Link to={{pathname: endpoint.register, state: {mainpage: "profile"}}}>
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