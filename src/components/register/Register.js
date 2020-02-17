import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Content from "./Content";
import Dialog from "../common/Dialog";
import { Payments, DialogMode } from "../common/Variables";
import UserInfo from "../data/UserInfo";
import styles from "./Register.module.scss";
import TOS from './TOS';

//NOTE: Nav에 함수를 던져주고 이 함수에서 Content의 Prop를 바꿔야함
//props는 실패. React Component에는 property가 추가되지 않음.(not extensible objet error).ref를 이용해서 그런듯.
//Content에 props로 현재 content를 지정해주고 content에서 souldcomponentupdate를 통해 렌더링 하도록 설정.
//Nav에 Content 컴포넌트 초기화 하는 함수를 props로 넘겨서 로그인 페이지 이동 버튼 누를때 호출하도록 함.
//Refesh 방지용으로 localstroage를 쓰니 로그인 페이지로 이동했다가 가입 페이지로 올때 이전 페이지를 기억하고 있음.
//localstorage에 초기화할지 물어보는걸로 변경
//Sessionstorage로 변경
//최종: 그냥 상위페이지에서 state로 관리하는걸로 변경 -> 어차피 새로고쳐도 url path 기준으로 render되기 때문에.
class Register extends Component {
    constructor(props) {
        super(props);           

        this.state = {curPage : "profile", tosAgree : true};
        this.dg = React.createRef();

        this.userInfoChange = this.userInfoChange.bind(this);  
        this.changePage = this.changePage.bind(this);
        this.register = this.register.bind(this);

        //테스트용 더미
        // this.state.userInfo.payments = this.dummy;
    }    

    // userInfo = {
    //     email: "",
    //     password: "",
    //     name: "",
    //     phone: "",
    //     address: "",
    //     payments: []
    // }

    userInfo = new UserInfo();

    dummy = [
        { kind: Payments.VISA, cardNumber: "1111-1111-1111-1111"},
        { kind: Payments.PAYPAL, email: "aaa@aaa.com"},
        { kind: Payments.FINTECH, id: "bbb"}
    ]

    changePage = (param) => {                
        this.setState({ curPage : param });        
    }
        
    userInfoChange(field) {        
        Object.assign(this.userInfo, field);
        console.log(this.userInfo);
    }

    register = () => {
        if (this.checkInfo()) {
            this.dg.current.showDialog(DialogMode.SUCCESS, "가입을 축하드립니다!\r\n'닫기'를 누르시면 로그인 화면으로 이동합니다.", "",
            () => {this.props.history.push("/")});
        }        
        else {
            this.dg.current.showDialog(DialogMode.ALERT, "입력하신 정보가 올바르지 않습니다. 확인해주세요.")
        }
        console.log(this.userInfo);     
        //NOTE:수동으로 route하는 방법.   
        // this.props.history.push("/");
    }

    checkInfo = () => {
        let valid = false;
        //emailCheck
        if (/^[a-z0-9\_]{3,}\@[a-z0-9\_]+\.[a-z0-9]+(\.[a-z0-9]+)?/i.test(this.userInfo.email))
            valid = true;
        //passwordCheck
        if ((/[0-9]+/i.test(this.userInfo.password)) && (/[^a-z0-9]+/i.test(this.userInfo.password)) && 
        (this.userInfo.password.length >= 10) && (this.userInfo.password.length <= 16) && 
        (/(\w)\1\1/.test(this.userInfo.password)))
            valid = true;
        //etcCheck
        if ((this.userInfo.name != "") && (this.userInfo.phone != "") && (this.userInfo.address))
            valid = true;

        return valid;
    }

    tosConfirm = (agreed) => {
        if (agreed) {
            this.setState({ tosAgree : true });
        }
        else {
            this.props.history.replace("/");
        }
    }

    render() {
        return (
            <div className={styles.register}>   
                <div className={styles.panel}/> 
                <div className={styles.container}>
                    {
                        this.state.tosAgree ?     
                            <React.Fragment>
                                <Nav onRegister={this.register} changeContent={this.changePage} userInfo={this.userInfo}></Nav>
                                <Content curPage={this.state.curPage} userInfoChange={this.userInfoChange} userInfo={this.userInfo}></Content>                                            
                                <Dialog ref={this.dg}/>
                            </React.Fragment>                                        
                            :
                            <TOS onConfirm={this.tosConfirm}/>
                    }     
                </div>                                            
            </div>
        );
    }
}


export default Register;