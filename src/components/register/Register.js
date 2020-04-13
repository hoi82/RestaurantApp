import React, { useState } from 'react';
import Nav from "./Nav";
import Content from "./Content";
import { DialogMode } from "../../data/Variables";
import styles from "./Register.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from '../../actions/common/dialog';
import loadable from '@loadable/component';
import TOS from "./TOS";

//NOTE: Nav에 함수를 던져주고 이 함수에서 Content의 Prop를 바꿔야함
//props는 실패. React Component에는 property가 추가되지 않음.(not extensible objet error).ref를 이용해서 그런듯.
//Content에 props로 현재 content를 지정해주고 content에서 souldcomponentupdate를 통해 렌더링 하도록 설정.
//Nav에 Content 컴포넌트 초기화 하는 함수를 props로 넘겨서 로그인 페이지 이동 버튼 누를때 호출하도록 함.
//Refesh 방지용으로 localstroage를 쓰니 로그인 페이지로 이동했다가 가입 페이지로 올때 이전 페이지를 기억하고 있음.
//localstorage에 초기화할지 물어보는걸로 변경
//Sessionstorage로 변경
//최종: 그냥 상위페이지에서 state로 관리하는걸로 변경 -> 어차피 새로고쳐도 url path 기준으로 render되기 때문에.
//여기에 Store를 구현하면 App 실행시 한번만 호출되기 때문에 컴포넌트가 랜더링 될때마다 호출되로록 변경

export default function Register(props) {     
    const [tosAgree, setTOSAgree] = useState(false);    
    const dispatch = useDispatch();
    const profile = useSelector((store) => store.register.profile);
    const payments = useSelector((store) => store.register.payments);        

    const renderContent = () => {                    
        return tosAgree ? 
        <React.Fragment>
            <Nav onRegister={handleRegister}></Nav>
            <Content></Content>                                                                        
        </React.Fragment>                                        
        :
        <TOS onConfirm={tosConfirm}/>;
    }

    const handleRegister = () => {          
        let valid = profile.getValid();
        if (valid) {
            fetch("http://localhost:3005/api/users",{
                method: "POST",
                headers: {                
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        email: profile.email,
                        password: profile.password,
                        name: profile.name,
                        contact: profile.contact,
                        address: profile.address,
                        payments: payments.list
                    }
                )    
            }).then((res) => res.json()).then((data) => {
                if (data.success) {
                    dispatch(showDialog({
                        mode: DialogMode.SUCCESS,
                        content: "가입을 축하드립니다. \r\n 닫기를 누르시면 로그인 화면으로 이동합니다.",
                        onClose: () => props.history.replace("/login")
                    }))
                }
                else {
                    dispatch(showDialog({
                        mode: DialogMode.ALERT,
                        content: "서버에서 에러가 발생했습니다."
                    }))
                }
            }).catch(dispatch(showDialog({
                mode: DialogMode.ALERT,
                content: "서버로 전송하던 도중 에러가 발생했습니다."
            })))
        }
        else {
            let message = "개인 정보가 올바르지 않습니다. 개인 정보를 확인해주세요.";            
            dispatch(showDialog({
                mode: DialogMode.ALERT,
                content: message,
                onClose: () => {console.log("dialog closed")}
            }));
        }
        //NOTE:수동으로 route하는 방법.   
        // this.props.history.push("/");                
    }    

    const tosConfirm = (agreed) => {
        if (agreed) {
            setTOSAgree(true);            
        }
        else {
            props.history.goBack();            
        }
    }    
    
    return (        
        <div className={styles.register}>   
            <div className={styles.panel}/> 
            <div className={styles.container}>
                { renderContent() }                
            </div>                                            
        </div>        
    );    
}