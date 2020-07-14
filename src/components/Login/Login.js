import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.scss";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { processLogIn } from '../../actions/auth';
import { endpoint } from '../../config/url';
import StyledCheckBox from '../StyledCheckBox';
import Validator from '../../utils/Validator';
import { closeDialog } from '../../actions/common/dialog';
import logo from "../../image/login.svg";
import { Formik, Form, Field } from 'formik';

export default function LogIn() {    
    const store = useStore();    
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogIn = (values, {setStatus, setErrors}) => {        
        dispatch(processLogIn(values.email, values.password)).then(() => {
            const {auth} = store.getState();            
           if (auth.isLogin) {
                dispatch(closeDialog());
           }
           else {                
                switch (auth.error) {
                    case "NO_USER": 
                        setErrors({
                            email: "사용자를 찾을수 없습니다.",
                            password: undefined
                        });                                           
                        break;
                    case "WRONG_PASSWORD":
                        setErrors({
                            email: undefined,
                            password: "비밀번호가 일치하지 않습니다."
                        })   
                        break;
                    default:
                        setErrors({
                            email: `에러가 발생했습니다. 관리자에게 문의해주세요.\r\nCode: ${auth.error}`,
                            password: undefined
                        })
                        break;
                }
           }
        });  
    }

    return (
        <Formik initialValues={{email: "", password: ""}} onSubmit={handleLogIn}>
            <LogInForm/>               
        </Formik>         
    )
}

const Input = ({field, form : { touched, errors, setFieldTouched }, type, header}) => {    
    const handleFocus = (e) => {
        setFieldTouched(field.name, false);
    }    

    return (
        <div className={styles.item_container}>
            <div className={styles.header_box}>
                <span className={styles.header_title}>{header}</span>
                <span className={touched[field.name] ? styles.error_title.concat(" ", styles.error_visible) : styles.error_title}>{errors[field.name]}</span>
            </div>
            <input type={type} className={styles.input} {...field} onFocus={handleFocus}/>
        </div>
    )
}

function LogInForm() {
    const auth = useSelector((store) => store.auth);
    const [remember, setRemember] = useState(false);    
    const dispatch = useDispatch();    

    const sendInfoByEmail = () => {
           
    }        

    const remeberChanged = (e) => {
        setRemember(e.target.checked);        
    }            

    const validateEmail = (value) => {
        return Validator.validateEmail(value);
    }

    const validatePassword = (value) => {
        return Validator.validatePassword(value);             
    }

    const handleRegister = (e) => {
        dispatch(closeDialog());
        window.localStorage.setItem("restaurantApp_prevUrl", location.pathname);
    }
    
    return (           
        <Form className={styles.login}>
            <div className={styles.item_container}>
                <img alt="로고" className={styles.logo} src={logo}></img>
            </div>
            <Field name="email" component={Input} header="이메일" type="text" validate={validateEmail}/>
            <Field name="password" component={Input} header="비밀번호" type="password" validate={validatePassword}/>
            <div className={styles.item_container}>                                                
                <StyledCheckBox onChange={remeberChanged} checked={remember} title={"이메일 저장"}/>
                <button type="button" className={styles.link_btn} onClick={sendInfoByEmail}> 
                    <span>이메일 / 비밀번호 찾기</span>
                </button>
            </div>
            <div className={styles.item_container}>
                <button type="submit" className={styles.login_btn} disabled={auth.isPending}>
                    <span>로그인</span>
                </button>
                <div className={styles.register_container}>
                    <span className={styles.sub_title}>아직 가입하지 않으셨나요?</span>
                    <Link className={styles.register_btn} to={{pathname: endpoint.register}} onClick={handleRegister}>
                        <span>가입하기</span>    
                    </Link>                            
                </div>
            </div>                      
        </Form>        
    );    
};