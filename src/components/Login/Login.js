import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.scss";
import global from "../../theme/global.scss";
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_SUCCESS, LOG_IN_FAILED, resetAuth, processLogIn } from '../../actions/auth';
import NavPanel from "../NavPanel"
import { endpoint } from '../../config/url';
import StyledCheckBox from '../StyledCheckBox';
import Validator from '../../utils/Validator';
import { ErrorMessages } from '../../types/ErrorMessages';
import { showDialog, closeDialog } from '../../actions/common/dialog';
import { DialogMode } from '../../types/Variables';
import logo from "../../image/login.svg";
import { Formik, Form, Field, useFormikContext } from 'formik';

export default function LogIn() {
    const dispatch = useDispatch();

    const handleLogIn = (values) => {
        dispatch(processLogIn(values.email, values.password));        
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
    const context = useFormikContext();
    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (auth.state == LOG_IN_FAILED) {            
            switch (auth.error) {
                case 404:                    
                    context.setFieldError("email", "사용자를 찾을수 없습니다.");
                    break;
                case 403:                    
                    context.setFieldError("password", "비밀번호가 일치하지 않습니다.");
                default:
                    break;
            }
        }
        else if (auth.state == LOG_IN_SUCCESS) {
            dispatch(closeDialog());
        }
    },[auth.state]);

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