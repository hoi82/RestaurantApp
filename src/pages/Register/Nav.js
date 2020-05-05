import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nav.module.scss";
import { endpoint } from "../../config/url";
import { useDispatch } from 'react-redux';
import { ResetRegisterStatus } from '../../actions/register/status';

export default function Nav({onRegister, history, location}) {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        history.replace(endpoint.register, { mainpage: e.target.value });
    }

    const handleRegister = (e) => {
        onRegister();
    }

    const handleBacktoLogin = (e) => {
        dispatch(ResetRegisterStatus());
    } 

    return (        
        <div className={styles.nav_container}>                
            <div className={styles.item_box}>                        
                <span className={styles.header}>필수</span>                         
                <button value="profile" className={location.state && location.state.mainpage == "profile" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={handleClick}>                            
                    <span className={styles.large_btn_text}>개인정보</span>
                </button>                        
                <span className={styles.header}>선택</span>                                            
                <button value="payment" className={location.state && location.state.mainpage == "payment" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={handleClick}>
                    <span className={styles.large_btn_text}>결제정보</span>
                </button>                                                                                     
            </div>
            <div className={styles.register_box}>
                <button className={styles.register_btn} onClick={handleRegister}>
                    <span className={styles.medium_btn_text}>가입하기</span>
                </button>
                <div className={styles.button_box}>
                    <span className={styles.small_text}>계정이 있으신가요?</span>
                    <Link to={endpoint.login} onClick={handleBacktoLogin}>
                        <button className={styles.link_btn}>
                            <div className={styles.link_text}>로그인</div>
                        </button>
                    </Link>                                
                </div>   
            </div>
        </div>        
    ); 
}