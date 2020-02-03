import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Dialog from "../common/Dialog";
import styles from "./Login.module.scss";
import logo from "../../image/login.svg";

class Login extends Component {
    constructor(props) {
        super(props);
        this.dg = React.createRef();
        this.state = { email: "", password: "", remember: false }
    }

    sendInfoByEmail = () => {
        //DB에 일치하는 주소가 있으면 보내고
        //없으면 
        this.dg.current.ShowDialog("테스트 용입니다.");
    }

    emailChanged = (event) => {
        this.setState({ email: event.target.value });
    }

    passwordChanged = (event) => {
        this.setState({ password: event.target.value });
    }

    remeberChanged = (event) => {
        this.setState({ remember: event.target.value });
    }

    render() {
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
                            <input type="email" className={styles.text_box} onChange={this.emailChanged}/>
                        </div>
                        <div className={styles.item_container}>
                            <span className={styles.sub_title}>
                                비밀번호
                            </span>
                            <input type="password" className={styles.text_box} onChange={this.passwordChanged}/>
                        </div>
                        <div className={styles.item_container}>                        
                            <div className={styles.cbx_container}>
                                <input className={styles.ipx} id="cbx" type="checkbox"/>
                                <label className={styles.cbx} htmlFor="cbx">
                                    <span>
                                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>                                            
                                        </svg>
                                    </span>
                                    <span className={styles.cbx_Text}>이메일 저장</span>
                                </label>                                
                            </div>
                            <button className={styles.link_btn} onClick={this.sendInfoByEmail}> 
                                <span className={styles.link_text}>이메일 / 비밀번호 찾기</span>
                            </button>
                        </div>
                        <div className={styles.item_container}>
                            <button className={styles.login_btn}>
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
                <Dialog ref={this.dg}></Dialog>
            </div>            
        );
    }
}

export default Login;