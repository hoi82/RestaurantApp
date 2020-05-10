import React, { useState } from 'react';
import styles from "./style.scss";
import close from "../../../../../image/close.svg";
import CreditNumberInput from '../../../../../components/InputWithHeader/CreditNumberInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateNumber, updateCVC, updateExpire, updateCashHolder } from '../../../../../actions/register/creditCard';
import CVCInput from '../../../../../components/InputWithHeader/CVCInput';
import ExpireInput from '../../../../../components/InputWithHeader/ExpireInput';
import NameInput from '../../../../../components/InputWithHeader/NameInput';
import { updatePayment, createPayment } from '../../../../../actions/register/payments';
import { showDialog } from '../../../../../actions/common/dialog';
import { DialogMode } from '../../../../../types/Variables';

export default function CreditCardInput({edit = false, movePage, checkDuplicate}) {  
    const credit = useSelector((store) => store.register.credit);
    const [forceUpdate, setForceUpdate] = useState(false);
    const dispatch = useDispatch(); 

    const backToList = () => {
        movePage("list");
    }

    const addEditAction = (action) => {
        if (credit.getValid()) {
            if (checkDuplicate(credit)) {
                dispatch(showDialog({
                    mode: DialogMode.ALERT,
                    content: "같은 카드 번호가 이미 존재합니다!",
                }));
            }
            else {
                dispatch(action(credit));
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
    
    const handleNumberChange = (e) => {
        dispatch(updateNumber(e.target.value));
    }

    const handleExpireChange = (e) => {
        dispatch(updateExpire(e.target.value));
    }

    const handleCVCChange = (e) => {
        dispatch(updateCVC(e.target.value));
    }

    const handleCashHolderChange = (e) => {
        dispatch(updateCashHolder(e.target.value));
    }    
        
    return (        
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.num_box}>
                    <CreditNumberInput value={credit.number} forceUpdate={forceUpdate} onChange={handleNumberChange}/>
                </div>
                <div className={styles.etc_box}>
                    <div className={styles.expire_box}>                                        
                        <ExpireInput value={credit.expire} forceUpdate={forceUpdate} onChange={handleExpireChange}/>
                    </div>
                    <div className={styles.cvc_box}>
                        <CVCInput value={credit.cvc} forceUpdate={forceUpdate} onChange={handleCVCChange}/>                    
                    </div>
                </div>   
                <div className={styles.name_box}>                
                    <NameInput value={credit.cashHolder} forceUpdate={forceUpdate} onChange={handleCashHolderChange}/>
                </div> 
            </div>                        
            <button className={styles.add_btn} onClick={edit ? handleEdit : handleAdd}>
                <span>
                    {edit ? "저장하기" : "추가하기"}                    
                </span>
            </button>
            <button className={styles.close_btn} onClick={handleClose}>
                <img src={close} className={styles.close_icon}/>
            </button>                
        </div>
    );    
}