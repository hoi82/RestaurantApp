import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Content from "./Content";
import styles from "./Register.module.scss";

//NOTE: Nav에 함수를 던져주고 이 함수에서 Content의 Prop를 바꿔야함
//props는 실패. React Component에는 property가 추가되지 않음.(not extensible objet error).ref를 이용해서 그런듯.
//Content에 props로 현재 content를 지정해주고 content에서 souldcomponentupdate를 통해 렌더링 하도록 설정.
//Nav에 Content 컴포넌트 초기화 하는 함수를 props로 넘겨서 로그인 페이지 이동 버튼 누를때 호출하도록 함.
//Refesh 방지용으로 localstroage를 쓰니 로그인 페이지로 이동했다가 가입 페이지로 올때 이전 페이지를 기억하고 있음.
//localstorage에 초기화할지 물어보는걸로 변경
class Register extends Component {
    constructor(props) {
        super(props);        
        this.state = { curContent : "profile" };        

        if (localStorage.getItem("haveToInitContent") == "true") {
            this.state = { curContent : "profile" };
        }
        else {
            this.state = { curContent : localStorage.getItem("curContent") || "profile" };
        }        

        //위의 state에 할당하면 if문을 지나면서 없어지기 때문에 여기에서 할당.
        Object.assign(this.state, {userInfo : { email : "", password : "", name : "", phone : "", address : "", payments : []}});
        //로그인 창에서 넘어올때는 true로 셋팅되서 넘어오기 때문에 0으로 설정해주면 새로고침시 초기화하지 않음.
        localStorage.setItem("haveToInitContent", false);

        this.userInfoChange = this.userInfoChange.bind(this);  
        this.changeContent = this.changeContent.bind(this);
        this.initContent = this.initContent.bind(this);
    }    

    changeContent = (param) => {                
        this.setState({ curContent : param }); 
        localStorage.setItem("curContent", param);
    }

    initContent = () => {
        this.setState({ curContent : "profile" }); 
    }
        
    userInfoChange(field) {        
        Object.assign(this.state.userInfo, field);
    }

    render() {
        return (
            <div className={styles.register}>                
                <Content curContent={this.state.curContent} userInfoChange={this.userInfoChange}></Content>                
                <Nav changeContent={this.changeContent} initContent={this.initContent} userInfo={this.state.userInfo}></Nav>
            </div>
        );
    }
}


export default Register;