import React, { useState } from 'react';
import styles from "./CreditCardInput.module.scss";
import close from "../../image/close.svg";
import PaymentInfo from '../../stores/payment';
import { useSelector, useDispatch } from 'react-redux';
import { addPayment } from '../../actions/register';
import { navigatePayment } from '../../actions/registerNavigation';
import { Payments } from '../../data/Variables';
import { Formatter } from '../../data/Formatter';

export default function CreditCardInput(props) {        
    let payment = new PaymentInfo(Payments.CREDIT_CARD);    
    const isEdit = useSelector((store) => store.registerNavigation.hasParams);
    const oldPayment = useSelector((store) => store.registerNavigation.params);    
    const dispatch = useDispatch();

    if (isEdit) {
        payment = oldPayment.clone();
    }

    const [numberError, setNumberError] = useState("");
    const [expireError, setExpireError] = useState("");
    const [cvcError, setcvcError] = useState("");
    
    const handleNumber = (e) => {       
        var code = e.keyCode;
        
        if (code > 47 && code < 58) {
          return;
        }
        
        if (e.ctrlKey || e.metaKey || e.altKey) {
          return;
        }

        if (code === 8 || code === 9 || code === 36 || code === 35 || code === 37 ||
            code === 39 || code === 8 || code === 46) {
          return;
        }
        event.preventDefault();
    }

    const handleExpire = (e) => {
        handleNumber(e);        
        const val = e.target.value.replace(/\D/g,"");
        
        if (val.length == 0) {
            if (e.key == "1" || e.key == "2") {
                return true;
            }
            else {

            }
        }
        else {

        }     
    }

    const handleCVC = (e) => {
        handleNumber(e);
    }

    const cardNumberChange = (e) => {
        e.target.value = Formatter.formatCardNumber(e.target.value);        
        payment.detail.creditCard.number = e.target.value;        
        e.target.data = e.target.value;
    }    

    const expireDateChange = (e) => {                
        e.target.value = Formatter.formatExpireDate(e.target.data, e.target.value);
        payment.detail.creditCard.expire = e.target.value;        
        e.target.data = e.target.value;     
    }

    const cvcChange = (e) => {
        payment.detail.creditCard.cvc = e.target.value;
        e.target.data = e.target.value;
    }

    const cardNumberOut = (e) => {
        if (e.target.data != undefined)
        {
            payment.detail.creditCard.validateNumber();
            setNumberError(payment.detail.creditCard.error.number);
        }
    }

    const expireOut = (e) => {
        if (e.target.data != undefined)
        {
            payment.detail.creditCard.validateExpire();
            setExpireError(payment.detail.creditCard.error.expire);
        }
    }

    const cvcOut = (e) => {
        if (e.target.data != undefined)
        {
            payment.detail.creditCard.validateCVC();
            setcvcError(payment.detail.creditCard.error.cvc);
        }
    }

    const handleAdd = (e) => {
        payment.detail.creditCard.validateAll();
        setNumberError(payment.detail.creditCard.error.number);
        setExpireError(payment.detail.creditCard.error.expire);
        setcvcError(payment.detail.creditCard.error.cvc);
        console.log(payment);
        if (payment.detail.creditCard.valid) {
            dispatch(addPayment(payment));
            dispatch(navigatePayment("list"));
        }   
        else {

        }     
    }

    const handleClose = (e) => {
        if (isEdit) {
            dispatch(navigatePayment("list"));
        }
        else {
            dispatch(navigatePayment("select"));
        }        
    }    
    
    //TODO: 마무리 작업
    return (
        <div className={styles.container}>                                             
            <div className={styles.num_box}>
                <span>카드 번호</span>
                <span>{numberError}</span>
                <input type="text" className={styles.num_input} maxLength="19" placeholder="1234 1234 1234 1234" defaultValue={payment.detail.creditCard.number} data="" 
                onKeyDown={handleNumber} onChange={cardNumberChange} onBlur={cardNumberOut}/>
            </div>
            <div className={styles.etc_box}>
                <div className={styles.expire_box}>
                    <span>만료일</span>
                    <span>{expireError}</span>
                    <input type="text" className={styles.expire_input} maxLength="5" placeholder="MM/YY" defaultValue={payment.detail.creditCard.expire} data="" 
                    onKeyDown={handleExpire} onChange={expireDateChange} onBlur={expireOut}/>
                </div>
                <div className={styles.cvc_box}>
                    <span>CVC</span>
                    <span> </span>
                    <input type="password" className={styles.cvc_input} maxLength="3" defaultValue={payment.detail.creditCard.cvc} data=""
                    onKeyDown={handleCVC} onChange={cvcChange} onBlur={cvcOut}/>
                </div>
            </div>                
            <button className={styles.add_btn} onClick={handleAdd}>
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