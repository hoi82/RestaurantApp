import React, { useState } from 'react';
import Payment from './Payment';
import { useSelector, useDispatch } from 'react-redux';
import { deletePayment } from '../../../actions/register/payments';
import { Payments } from '../../../types/Variables';
import { assignCredit, newCreditCard } from '../../../actions/register/creditCard';
import { newPaypal, assignPaypal } from '../../../actions/register/paypal';
import styles from "./Payment.module.scss";
import loadable from '@loadable/component';

const PaymentList = loadable(() => import("./List/PaymentList"));
const PaymentItem = loadable(() => import("./PaymentItem"));
const PaymentSelect = loadable(() => import("./Select/PaymentSelect"));
const CreditCard = loadable(() => import("./Add/CreditCard"));
const Paypal = loadable(() => import("./Add/Paypal"));
const FintechInput = loadable(() => import("./Add/Fintech/FintechInput"));

export default function PaymentContainer({location, history}) {
    const payments = useSelector((store) => store.register.payments.list); 
    const [pageName, setPageName] = useState("list");   
    const dispatch = useDispatch();

    const renderContent = (page) => {        
        let component = null;     
        switch (page) {
            case "list":
                component = <PaymentList>
                    {renderPayments(payments)}
                </PaymentList>;
                break;
            case "select":
                component = <PaymentSelect onCreate={handleCreate} movePage={movePage}/>;
                break;
            case "card":
                component = <CreditCard edit={false} movePage={movePage} checkDuplicate={checkDuplicate}/>;
                break;
            case "card_edit":
                component = <CreditCard edit={true} movePage={movePage} checkDuplicate={checkDuplicate}/>;
                break;
            case "paypal":
                component = <Paypal edit={false} movePage={movePage} checkDuplicate={checkDuplicate}/>;
                break;
            case "paypal_edit":
                component = <Paypal edit={true} movePage={movePage} checkDuplicate={checkDuplicate}/>;
                break;
            case "fintech":
                component = <FintechInput/>;
                break;
            default:
                component = <PaymentList>
                    {renderPayments(payments)}
                </PaymentList>;
                break;            
        }

        return <div className={styles.content_box}>
            {component}
        </div>
    };     

    const renderPayments = () => {                
        return (
            payments.map((item, i) => {
                return <PaymentItem payment={item} key={i} onEdit={onEditItem} onRemove={handleRemove}/>
            })            
        ); 
    }   

    const onEditItem = (item) => {                                  
        switch (item.kind) {
            case Payments.CREDIT_CARD:
                dispatch(assignCredit(item));                                
                setPageName("card_edit");
                break;
            case Payments.PAYPAL:
                dispatch(assignPaypal(item));                
                setPageName("paypal_edit");
            default:
                break;
        }        
    }

    const handleRemove = (index) => {
        dispatch(deletePayment(index));        
    }    

    const handleCreate = (kind) => {              
        switch (kind) {
            case Payments.CREDIT_CARD:
                dispatch(newCreditCard());
                setPageName("card");
                break;        
            case Payments.PAYPAL:
                dispatch(newPaypal());
                setPageName("paypal");
            default:
                break;
        }
    }

    const movePage = (name) => {
        setPageName(name);
    }

    const checkDuplicate = (payment) => {        
        if (payment.kind == Payments.CREDIT_CARD) {
            return payments.filter((item, i) => item.number == payment.number).length > 0;
        }
        else if (payment.kind == Payments.PAYPAL) {
            return payments.filter((item, i) => item.email == payment.email).length > 0;
        }
        else {
            return false;
        }
    }

    return (
        <Payment payments={payments} pageName={pageName} movePage={movePage} movePage={movePage}>            
            {renderContent(pageName)}
        </Payment>
    );
}