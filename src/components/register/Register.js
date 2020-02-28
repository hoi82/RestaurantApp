import React, { useState, useRef } from 'react';
import Nav from "./Nav";
import Content from "./Content";
import Dialog from "../common/Dialog";
import { DialogMode } from "../../data/Variables";
import styles from "./Register.module.scss";
import TOS from './TOS';
import { useDispatch, useSelector } from 'react-redux';
import { validateAllProfile } from '../../actions/register';

//NOTE: Nav에 함수를 던져주고 이 함수에서 Content의 Prop를 바꿔야함
//props는 실패. React Component에는 property가 추가되지 않음.(not extensible objet error).ref를 이용해서 그런듯.
//Content에 props로 현재 content를 지정해주고 content에서 souldcomponentupdate를 통해 렌더링 하도록 설정.
//Nav에 Content 컴포넌트 초기화 하는 함수를 props로 넘겨서 로그인 페이지 이동 버튼 누를때 호출하도록 함.
//Refesh 방지용으로 localstroage를 쓰니 로그인 페이지로 이동했다가 가입 페이지로 올때 이전 페이지를 기억하고 있음.
//localstorage에 초기화할지 물어보는걸로 변경
//Sessionstorage로 변경
//최종: 그냥 상위페이지에서 state로 관리하는걸로 변경 -> 어차피 새로고쳐도 url path 기준으로 render되기 때문에.
export default function Register() {    
    const [curPage, setPage] = useState("profile");
    const [tosAgree, setTOSAgree] = useState(false);
    const errors = useSelector((store) => store.register.errors);
    const dialogref = useRef(null);
    const dispatch = useDispatch();

    const changePage = (param) => {    
        setPage(param);            
    }        

    const register = () => { 
        dispatch(validateAllProfile());           
        //NOTE:수동으로 route하는 방법.   
        // this.props.history.push("/");
        dialogref.current.showDialog(DialogMode.ALERT, "테스트", null, () => {console.log("dialog closed")});
    }    

    const tosConfirm = (agreed) => {
        if (agreed) {
            setTOSAgree(true);            
        }
        else {
            history.replace("/");            
        }
    }
    
    return (
        <div className={styles.register}>   
            <div className={styles.panel}/> 
            <div className={styles.container}>
                {
                    tosAgree ?     
                        <React.Fragment>
                            <Nav onRegister={register} changeContent={changePage}></Nav>
                            <Content curPage={curPage}></Content>                                            
                            <Dialog ref={dialogref}/>
                        </React.Fragment>                                        
                        :
                        <TOS onConfirm={tosConfirm}/>
                }     
            </div>                                            
        </div>
    );
}