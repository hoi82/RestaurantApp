import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import { useDispatch, useSelector, useStore, shallowEqual } from 'react-redux';
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

    const handleLogIn = (values, {setStatus, setErrors}) => {        
        dispatch(processLogIn(values.email, values.password)).then(() => {
            const {auth} = store.getState();            
           if (auth.isLogin) {
                dispatch(closeDialog());
           }
           else {
                switch (auth.error) {
                    case 404: 
                        setErrors({
                            email: "사용자를 찾을수 없습니다.",
                            password: undefined
                        });                                           
                        break;
                    case 403:
                        setErrors({
                            email: undefined,
                            password: "비밀번호가 일치하지 않습니다."
                        })   
                        break;
                    default:
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
                <button type="submit" className={styles.login_btn}>
                    <span>로그인</span>
                </button>
                <div className={styles.register_container}>
                    <span className={styles.sub_title}>아직 가입하지 않으셨나요?</span>
                    <Link className={styles.register_btn} to={{pathname: endpoint.register}} onClick={() => dispatch(closeDialog())}>
                        <span>가입하기</span>    
                    </Link>                            
                </div>
            </div>                      
        </Form>        
    );    
};