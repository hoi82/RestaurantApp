import React from 'react';
import PaypalInput from './PaypalInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword, validateEmail, validatePassword, refreshPaypal } from '../../../../../actions/register/paypal';
import { updatePayment, createPayment } from '../../../../../actions/register/payments';
import { navigatePayment } from '../../../../../actions/register/registerNavigation';

function PaypalContainer(props) {
    const paypal = useSelector((store) => store.register.paypal);          
    const dispatch = useDispatch();

    const handleClose = (e) => {
        if (props.edit) {
            dispatch(navigatePayment("list"));
        }
        else {
            dispatch(navigatePayment("select"));            
        }        
    }

    const handleChange = (e) => {        
        switch (e.target.name) {
            case "email":
                dispatch(updateEmail(e.target.value));  
                break;
            case "password":
                dispatch(updatePassword(e.target.value));
                break;
            default:
                break;
        }
    }    

    const handleBlur = (e) => {        
        if (true) {
            switch (e.target.name) {
                case "email":
                    dispatch(validateEmail());
                    break;
                case "password":                    
                    dispatch(validatePassword());
                    break;
                default:
                    break;
            }
        }
    }        

    const handleEdit = () => {
        dispatch(refreshPaypal());
        if (paypal.getValid()) {
            dispatch(updatePayment(paypal));
            dispatch(navigatePayment("list"));
        }   
        else {
            
        }     
    }

    const handleAdd = () => {
        dispatch(refreshPaypal());
        if (paypal.getValid()) {
            dispatch(createPayment(paypal));
            dispatch(navigatePayment("list"));
        }
        else {

        }        
    }

    const functions = {
        change: handleChange,
        blur: handleBlur,
        add: handleAdd,
        edit: handleEdit,
        close: handleClose
    }

    return (
        <PaypalInput edit={props.edit} email={paypal.email} emailError={paypal.emailError} password={paypal.password} passwordError={paypal.passwordError} functions={functions}/>
    );
}

export default PaypalContainer;