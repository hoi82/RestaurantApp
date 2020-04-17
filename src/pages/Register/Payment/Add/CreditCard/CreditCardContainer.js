import React from 'react';
import CreditCardInput from './CreditCardInput';
import { useDispatch, useSelector } from 'react-redux';
import { navigatePayment } from '../../../../../actions/register/registerNavigation';
import Formatter from '../../../../../utils/Formatter';
import { updateNumber, updateExpire, updateCVC, updateCashHolder, validateNumber, validateExpire, validateCVC, validateCashHolder, refreshCredit } from '../../../../../actions/register/creditCard';
import { updatePayment, createPayment } from '../../../../../actions/register/payments';

export default function CreditCardContainer({edit = false}) {        
    const credit = useSelector((store) => store.register.credit);    
    const dispatch = useDispatch();      
    
    const handleChange = (e) => {                  
        switch (e.target.name) {
            case "number":                                
                e.target.value = Formatter.formatCardNumber(e.target.value);
                dispatch(updateNumber(e.target.value));
                break;            
            case "expire":
                e.target.value = Formatter.formatExpireDate(e.target.value);
                dispatch(updateExpire(e.target.value));
                break;
            case "cvc":
                dispatch(updateCVC(e.target.value));
                break;
            case "name":
                dispatch(updateCashHolder(e.target.value));
                break;
            default:
                break;
        }
    }            
    
    const handleBlur = (e) => {
        switch (e.target.name) {
            case "number":                                                
                dispatch(validateNumber());
                break;            
            case "expire":                
                dispatch(validateExpire());
                break;
            case "cvc":
                dispatch(validateCVC());
                break;
            case "name":
                dispatch(validateCashHolder());
                break;
            default:
                break;
        }
    }        
    
    const handleEdit = () => {    
        dispatch(refreshCredit()); 
        
        if (true) {
            dispatch(updatePayment(credit));
            dispatch(navigatePayment("list"));
        }   
        else {

        }         
    }

    const handleAdd = () => {
        dispatch(refreshCredit());                        
        if (credit.getValid()) {
            dispatch(createPayment(credit));
            dispatch(navigatePayment("list"));
        } else {
            
        }        
    }

    const handleClose = (e) => {
        if (edit) {
            dispatch(navigatePayment("list"));
        }
        else {
            dispatch(navigatePayment("select"));
        }        
    }    

    const functions = {
        change: handleChange,   
        blur: handleBlur,     
        edit: handleEdit,
        add: handleAdd,
        close: handleClose
    };

    return (
        <CreditCardInput edit={edit} number={credit.number} numberError={credit.numberError} expire={credit.expire} expireError={credit.expireError} 
        cvc={credit.cvc} cvcError={credit.cvcError} cashHolder={credit.cashHolder} cashHolderError={credit.cashHolderError} functions={functions}/>
    );
}