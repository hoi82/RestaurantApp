import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./Nav.module.scss";
import { useDispatch } from 'react-redux';
import { useFormikContext } from 'formik';

export default function Nav({pageName, movePage, onRegister}) {
    const dispatch = useDispatch();
    const context = useFormikContext();
    const history = useHistory();

    const handleClick = (e) => {
        movePage(e.target.value);
    }

    const handleRegister = (e) => {        
        context.submitForm();
    }

    const handleBacktoLogin = (e) => {
        
    }     

    return (        
        <div className={styles.nav_container}>                
            <div className={styles.item_box}>                        
                <span className={styles.header}>필수</span>                         
                <button value="profile" className={pageName == "profile" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={handleClick}>                            
                    <span className={styles.large_btn_text}>개인정보</span>
                </button>                        
                <span className={styles.header}>선택</span>                                            
                <button value="payment" className={pageName == "payment" ? styles.item_btn + " " + styles.selected : styles.item_btn} onClick={handleClick}>
                    <span className={styles.large_btn_text}>결제정보</span>
                </button>                                                                                     
            </div>
            <div className={styles.register_box}>
                <button className={styles.register_btn} onClick={handleRegister}>
                    <span className={styles.medium_btn_text}>가입하기</span>
                </button>
                <div className={styles.button_box}>
                    <span className={styles.small_text}>계정이 있으신가요?</span>
                    <button type="button" className={styles.link_btn} onClick={handleBacktoLogin}>
                        <div className={styles.link_text}>로그인</div>
                    </button>                                
                </div>   
            </div>
        </div>        
    ); 
}