import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Content from "./Content";
import styles from "./Register.module.scss";

//NOTE: Nav에 함수를 던져주고 이 함수에서 Content의 Prop를 바꿔야함
//props는 실패. React Component에는 property가 추가되지 않음.(not extensible objet error)
//Content의 함수를 호출해 Content 내부에서 state를 변경해 render하는 방식으로 해야할듯.
class Register extends Component {
    constructor(props) {
        super(props);        
        this.cb = React.createRef();
    }

    //TODO: content 컴포넌트부터 시작
    ChangeContent = (param) => {        
        this.cb.current.SetContent(param); 
    }

    componentDidMount() {
        this.ChangeContent = this.ChangeContent.bind(this);        
    }

    render() {
        return (
            <div className={styles.register}>                
                <Content ref={this.cb}></Content>
                <Nav ChangeContent={this.ChangeContent}></Nav>
            </div>
        );
    }
}


export default Register;