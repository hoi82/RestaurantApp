import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Nav.module.scss";
import NavItem from "./NavItem";
import logo from "../../image/register.svg";
import profile from "../../image/profile.svg";
import payment from "../../image/payment.svg";

class Nav extends Component {
    constructor(props) {
        super(props);        
    }    

    //NOTE: onClick 이벤트에 this.func() 형태로 넣으면 함수의 리턴값을 이벤트로 설정한다는 의미이기 때문에 ()를 제거하고 써야함
    //부득이하게 파라미터를 넣을거라면 arrow function 형태로 넣을것.
    render() {
        return (
            <div className={styles.nav}>
                <div className={styles.nav_container}>
                    <div className={styles.nav_box}>
                        <div className={styles.item_container}>
                            <img src={logo} alt="로고" className={styles.logo}></img>
                        </div>
                        <div className={styles.item_container}>
                            <button className={styles.transparent_btn} onClick={ (e) => {this.props.changeContent("profile")}}>
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
                            <button className={styles.register_btn} onClick={this.props.onRegister}>
                                <span className={styles.medium_btn_text}>가입하기</span>
                            </button>
                            <div className={styles.button_box}>
                                <span className={styles.small_text}>계정이 있으신가요?</span>
                                <Link to={"/"}>
                                    <button className={styles.link_btn}>
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