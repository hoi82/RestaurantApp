import React, { useState } from 'react';
import styles from "./CreditCardInput.module.scss";
import close from "../../image/close.svg";
import PaymentInfo from '../../stores/payment';
import { useSelector, useDispatch } from 'react-redux';
import { addPayment } from '../../actions/register';
import { navigatePayment } from '../../actions/registerNavigation';
import { Payments } from '../../data/Variables';
import { Formatter } from '../../data/Formatter';
import { ErrorMessages } from '../../data/ErrorMessages';

export default function CreditCardInput(props) {        
    let payment = new PaymentInfo(Payments.CREDIT_CARD);
    let credit = payment.detail.creditCard;
    const isEdit = useSelector((store) => store.registerNavigation.hasParams);
    const oldPayment = useSelector((store) => store.registerNavigation.params);    
    const dispatch = useDispatch();
    let startValidate = ((stdError) => {
        return stdError != ErrorMessages.CORRECT;
    })(numberError);

    if (isEdit) {
        payment = oldPayment.clone();
        credit = payment.detail.creditCard;
    }

    const [numberError, setNumberError] = useState(ErrorMessages.CORRECT);
    const [expireError, setExpireError] = useState(ErrorMessages.CORRECT);
    const [cvcError, setcvcError] = useState(ErrorMessages.CORRECT);
    const [nameError, setNameError] = useState(ErrorMessages.CORRECT);
    
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

    const handleChange = (e) => {
        startValidate = true;
        switch (e.target.name) {
            case "number":
                e.target.value = Formatter.formatCardNumber(e.target.value);        
                credit.number = e.target.value;                
                break;            
            case "expire":
                e.target.value = Formatter.formatExpireDate(e.target.data, e.target.value);
                credit.expire = e.target.value;
                break;
            case "cvc":
                credit.cvc = e.target.value;        
                break;
            case "name":
                credit.name = e.target.value;
                break;
            default:
                break;
        }
    }      
    
    const handleBlur = (e) => {
        if (startValidate) {
            switch (e.target.name) {
                case "number":
                    credit.validateNumber();
                    setNumberError(credit.error.number);
                    break;            
                case "expire":
                    credit.validateExpire();
                    setExpireError(credit.error.expire);
                    break;
                case "cvc":
                    credit.validateCVC();
                    setcvcError(credit.error.cvc);      
                    break;
                case "name":
                    credit.validateName();
                    setNameError(credit.error.name);                    
                    break;
                default:
                    break;
            }
        }
    }

    const handleAddorEdit = (e) => {
        credit.validateAll();
        setNumberError(credit.error.number);
        setExpireError(credit.error.expire);
        setcvcError(credit.error.cvc);      
        setNameError(credit.error.name);                
        if (credit.valid) {
            if (isEdit) {

            }
            else {
                dispatch(addPayment(payment));                
            }            
            dispatch(navigatePayment("list"));
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
        
    return (
        <div className={styles.container}>                                             
            <div className={styles.num_box}>
                <span>카드 번호</span>                
                <input name="number" type="text" className={styles.num_input} maxLength="19" placeholder="1234 1234 1234 1234" defaultValue={credit.number} 
                onKeyDown={handleNumber} onChange={handleChange} onBlur={handleBlur}/>
                <span className={styles.error_text}>{numberError}</span>
            </div>
            <div className={styles.etc_box}>
                <div className={styles.expire_box}>
                    <span>만료일</span>                    
                    <input name="expire" type="text" className={styles.expire_input} maxLength="5" placeholder="MM/YY" defaultValue={credit.expire}
                    onKeyDown={handleExpire} onChange={handleChange} onBlur={handleBlur}/>
                    <span className={styles.error_text}>{expireError}</span>
                </div>
                <div className={styles.cvc_box}>
                    <span>CVC</span>                    
                    <input name="cvc" type="password" className={styles.cvc_input} maxLength="3" defaultValue={credit.cvc}
                    onKeyDown={handleCVC} onChange={handleChange} onBlur={handleBlur}/>
                    <span className={styles.error_text}>{cvcError}</span>
                </div>
            </div>   
            <div className={styles.name_box}>
                <span>소유자 이름</span>
                <input name="name" type="text" className={styles.name_input} placeholder="John Doe" defaultValue={credit.name}
                onChange={handleChange} onBlur={handleBlur}/>
                <span className={styles.error_text}>{nameError}</span>
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