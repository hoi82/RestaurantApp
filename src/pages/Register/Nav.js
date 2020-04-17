import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nav.module.scss";
import { useDispatch } from 'react-redux';
import { navigateRoot } from '../../actions/register/registerNavigation';
import { clearProfile, refreshProfile } from '../../actions/register/profile';
import { endpoint } from "../../config/url";

export default function Nav(props) {
    const [selected, setSelected] = useState("profile");
    const dispatch = useDispatch();

    const handleClick = (e) => {        
        dispatch(navigateRoot(e.target.value));
        dispatch(clearProfile());
        setSelected(e.target.value);        
    }

    const handleRegister = (e) => {
        dispatch(refreshProfile());
        setSelected("profile");        
        props.onRegister();
    }     

    return (        
        <div className={styles.nav_container}>                
            <div className={styles.item_box}>                        
                <span className={styles.header}>필수</span>                         
                <button value="profile" className={selected == "profile" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={handleClick}>                            
                    <span className={styles.large_btn_text}>개인정보</span>
                </button>                        
                <span className={styles.header}>선택</span>                                            
                <button value="payment" className={selected == "payment" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={handleClick}>
                    <span className={styles.large_btn_text}>결제정보</span>
                </button>                                                                                     
            </div>
            <div className={styles.register_box}>
                <button className={styles.register_btn} onClick={handleRegister}>
                    <span className={styles.medium_btn_text}>가입하기</span>
                </button>
                <div className={styles.button_box}>
                    <span className={styles.small_text}>계정이 있으신가요?</span>
                    <Link to={endpoint.login}>
                        <button className={styles.link_btn}>
                            <div className={styles.link_text}>로그인</div>
                        </button>
                    </Link>                                
                </div>   
            </div>
        </div>
        
    ); 
}