import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nav.module.scss";
import logo from "../../image/register.svg";
import profile from "../../image/profile.svg";
import payment from "../../image/payment.svg";

class Nav extends Component {
    constructor(props) {
        super(props);        
    }
    //NOTE: onClick에 Props에 들어있는 method를 지정하면 자동으로 바인딩이 걸려 render시 이벤트가 발생함
    //이를 막기 위해서는 arrow function로 구현해야함.
    //But, arrow function은 이벤트 발생때마다 오브젝트를 계속 만들기 때문에 신중하게 선택해야 함
    render() {
        return (
            <div className={styles.nav}>
                <div className={styles.nav_container}>
                    <div className={styles.nav_box}>
                        <div className={styles.item_container}>
                            <img src={logo} alt="로고" className={styles.logo}></img>
                        </div>
                        <div className={styles.item_container}>
                            <button className={styles.transparent_btn} onClick={ (e) => {this.props.changeContent("profile"); localStorage.setItem("haveToInitPayment", true)}}>
                                <div className={styles.button_box}>
                                    <img src={profile} alt="개인정보 아이콘" className={styles.small_logo}></img>
                                    <span className={styles.large_btn_text}>개인정보</span>                                                                    
                                </div>
                            </button>
                        </div>                        
                        <div className={styles.item_container}>
                            <button className={styles.transparent_btn} onClick={ (e) => {this.props.changeContent("payment")}}>
                                <div className={styles.button_box}>
                                    <img src={payment} alt="결재정보 아이콘" className={styles.small_logo}></img>
                                    <span className={styles.large_btn_text}>결재정보</span>
                                    <span className={styles.medium_sub_btn_text}>(선택)</span>
                                </div>
                            </button>
                        </div>
                        <div className={styles.item_container}>
                            <button className={styles.register_btn}>
                                <span className={styles.medium_btn_text}>가입하기</span>
                            </button>
                            <div className={styles.button_box}>
                                <span className={styles.small_text}>계정이 있으신가요?</span>
                                <Link to={"/"}>
                                    <button className={styles.link_btn} onClick={ (e) => {this.props.initContent()}}>
                                        <div className={styles.link_text}>로그인</div>
                                    </button>
                                </Link>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;