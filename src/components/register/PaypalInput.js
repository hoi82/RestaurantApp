import React, { useState } from 'react';
import styles from "./PaypalInput.module.scss";
import close from "../../image/close.svg";
import { useDispatch, useSelector } from 'react-redux';
import { navigatePayment } from '../../actions/registerNavigation';
import PaymentInfo from '../../stores/payment';
import { Payments } from '../../data/Variables';
import { ErrorMessages } from '../../data/ErrorMessages';
import { addPayment } from '../../actions/register';

export default function PaypalInput() {    
    let payment = new PaymentInfo(Payments.PAYPAL);
    let paypal = payment.detail.paypal;
    const isEdit = useSelector((store) => store.registerNavigation.hasParams);
    const oldPayment = useSelector((store) => store.registerNavigation.params);
    const dispatch = useDispatch(); 
    let startValidate = ((stdError) => {
        return stdError != ErrorMessages.CORRECT;
    })(emailError);
    
    console.log("redner");

    //TODO: Blur시 두번 랜더링 되는 문제
    //렌더링마다 param 가져오는 문제
    //nput email 자동완성시 퍼포먼스 저하는 왜 일어나는지
    if (isEdit) {
        payment = oldPayment.clone();        
        paypal = payment.detail.paypal;
    }

    const [emailError, setEmailError] = useState(ErrorMessages.CORRECT);
    const [passwordError, setPasswordError] = useState(ErrorMessages.CORRECT);

    const handleClose = (e) => {
        if (isEdit) {
            dispatch(navigatePayment("list"));
        }
        else {
            dispatch(navigatePayment("select"));
        }        
    }

    const handleChange = (e) => {
        startValidate = true;
        switch (e.target.name) {
            case "email":
                paypal.email = e.target.value;                    
                break;
            case "password":
                paypal.password = e.target.value;
                break;
            default:
                break;
        }
    }

    const handleFocus = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailError(ErrorMessages.CORRECT);
                break;
            case "password":
                setPasswordError(ErrorMessages.CORRECT);
                break;
            default:
                break;
        }
    }

    const handleBlur = (e) => {
        if (startValidate) {
            switch (e.target.name) {
                case "email":
                    paypal.validateEmail();
                    setEmailError(paypal.error.email);        
                    break;
                case "password":
                    paypal.validatePassword();
                    setPasswordError(paypal.error.password);
                    break;
                default:
                    break;
            }
        }
    }        

    const handleAddorEdit = (e) => {
        startValidate = true;
        paypal.validateAll();
        setEmailError(paypal.error.email);
        setPasswordError(paypal.error.password);        
        if (paypal.valid) {
            if (isEdit) {

            }
            else {
                dispatch(addPayment(payment));                
            }            
            dispatch(navigatePayment("list"));
        }        
    }    

    return (
        <div className={styles.container}>
            <div className={styles.content_container}>
                <span>이메일</span>
                <input name="email" type="email" placeholder="aaa@aaa.com" defaultValue={paypal.email} 
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
                <span className={styles.error_text}>{emailError}</span>
            </div>
            <div className={styles.content_container}>
                <span>비밀번호</span>
                <input name="password" type="password" defaultValue={paypal.password} 
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
                <span className={styles.error_text}>{passwordError}</span>
            </div>
            <button className={styles.add_btn} onClick={handleAddorEdit}>
                <span className={styles.add_btn_text}>
                    {isEdit ? "저장하기" : "추가하기"}
                </span>
            </button>
            <button className={styles.close_btn} onClick={handleClose}>
                <img src={close} className={styles.close_icon}/>
            </button>
        </div>
    );    
}