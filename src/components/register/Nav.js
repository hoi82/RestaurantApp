import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nav.module.scss";
import { useDispatch } from 'react-redux';
import { navigateRoot } from '../../actions/register/registerNavigation';
import { refreshProfile, clearProfile } from '../../actions/register/profile';

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

    //NOTE: onClick 이벤트에 func() 형태로 넣으면 함수의 리턴값을 이벤트로 설정한다는 의미이기 때문에 ()를 제거하고 써야함
    //부득이하게 파라미터를 넣을거라면 arrow function 형태로 넣을것.    
    return (
        <div className={styles.nav}>
            <div className={styles.nav_panel}/>
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
                        <Link to={"/login"}>
                            <button className={styles.link_btn}>
                                <div className={styles.link_text}>로그인</div>
                            </button>
                        </Link>                                
                    </div>   
                </div>
            </div>
        </div>
    );   
}