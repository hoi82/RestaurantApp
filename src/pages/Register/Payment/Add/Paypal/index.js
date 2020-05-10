import React, { useState } from 'react';
import styles from "./style.scss";
import close from "../../../../../image/close.svg";
import EmailInput from "../../../../../components/InputWithHeader/EmailInput";
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword } from "../../../../../actions/register/paypal";
import ExternalPasswordInput from '../../../../../components/InputWithHeader/ExternalPasswordInput';
import { updatePayment, createPayment } from '../../../../../actions/register/payments';
import { DialogMode } from '../../../../../types/Variables';
import { showDialog } from '../../../../../actions/common/dialog';

export default function PaypalInput({edit=false, movePage, checkDuplicate}) {
    const paypal = useSelector((store) => store.register.paypal);
    const [forceUpdate, setForceUpdate] = useState(false);
    const dispatch = useDispatch();

    const backToList = () => {
        movePage("list");
    }

    const addEditAction = (action) => {
        if (paypal.getValid()) {
            if (checkDuplicate(paypal)) {
                dispatch(showDialog({
                    mode: DialogMode.ALERT,
                    content: "같은 이메일 주소가 이미 존재합니다!",
                }));
            }
            else {
                dispatch(action(paypal));
                backToList();
            }
        }
        else {
            setForceUpdate(true);
        }
    };

    const handleEdit = () => {        
        addEditAction(updatePayment);
    }

    const handleAdd = () => {        
        addEditAction(createPayment);      
    }

    const handleClose = (e) => {
        if (edit) {
            backToList();
        }
        else {
            movePage("select");
        }        
    }  

    const handleEmailChange = (e) => {
        dispatch(updateEmail(e.target.value));
    }

    const handlePasswordChange = (e) => {
        dispatch(updatePassword(e.target.value));
    }

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.content_container}>                
                    <EmailInput value={paypal.email} forceUpdate={forceUpdate} onChange={handleEmailChange}/>
                </div>
                <div className={styles.content_container}>                
                    <ExternalPasswordInput value={paypal.password} forceUpdate={forceUpdate} onChange={handlePasswordChange}/>
                </div>
            </div>            
            <button className={styles.add_btn} onClick={edit ? handleEdit : handleAdd}>
                <span className={styles.add_btn_text}>
                    {edit ? "저장하기" : "추가하기"}
                </span>
            </button>
            <button className={styles.close_btn} onClick={handleClose}>
                <img src={close} className={styles.close_icon}/>
            </button>
        </div>
    );    
}