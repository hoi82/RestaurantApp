import React, { useState } from 'react';
import Payment from './Payment';
import { Payments } from '../../../types/Variables';
import styles from "./Payment.module.scss";
import loadable from '@loadable/component';
import { useFormikContext, Formik } from 'formik';
import Validator from '../../../utils/Validator';
import { ErrorMessages } from '../../../types/ErrorMessages';

const PaymentList = loadable(() => import("./List/PaymentList"));
const PaymentItem = loadable(() => import("./PaymentItem"));
const PaymentSelect = loadable(() => import("./Select/PaymentSelect"));
const CreditCard = loadable(() => import("./Add/CreditCard"));
const Paypal = loadable(() => import("./Add/Paypal"));
const FintechInput = loadable(() => import("./Add/Fintech/FintechInput"));

export default function PaymentContainer({arrayHelper}) {    
    const context = useFormikContext();
    const [pageName, setPageName] = useState("list");  
    const [editingPayment, setEditingPayment] = useState({});     
    
    const handleAdd = (values) => {        
        arrayHelper.push(values);
        setPageName("list");
    }

    const handleEdit = (values) => {
        arrayHelper.replace(values.index, values);
        setPageName("list");
    }

    const validateCredit = (values) => {
        const errors = {};        

        Validator.validateCreditNumberCallback(values.number, (name, error) => {
            if (error) {
                errors.number = error;
            }
        });

        if (context.values.payments.find((payment) => (payment.number == values.number && payment.index != values.index))) {
            errors.number = ErrorMessages.DUPLICATED_CARD_NUMER;
        }
        
        Validator.validateExpireCallback(values.expire, (error) => {
            if (error) {
                errors.expire = error;
            }
        });

        Validator.validateCVCCallback(values.cvc, (error) => {
            if (error) {
                errors.cvc = error;
            }
        })
        
        Validator.validateNameCallback(values.cashHolder, (error) => {
            if (error) {
                errors.cashHolder = error;
            }
        });        

        return errors;
    }    

    const validatePaypal = (values) => {
        const errors = {};

        Validator.validateEmailCallback(values.email, (err) => {
            if (err) {
                errors.email = err;
            }
        });

        Validator.validateExternalPasswordCallback(values.password, (err) => {
            if (err) {
                errors.password = err;
            }
        })

        return errors;
    }

    const renderContent = (page) => {        
        let component = null;     
        switch (page) {
            case "list":
                component = <PaymentList>
                    {renderPayments(context.values.payments)}
                </PaymentList>;
                break;
            case "select":
                component = <PaymentSelect onCreate={handleCreate} movePage={movePage}/>;
                break;
            case "card":
                component = <Formik initialValues={{
                    kind: Payments.CREDIT_CARD,
                    index: context.values.payments.length,
                    number: "",
                    expire: "",
                    cvc: "",
                    cashHolder: ""
                }} onSubmit={handleAdd} validate={validateCredit}>
                    <CreditCard edit={false} movePage={movePage}/>
                </Formik>;
                break;
            case "card_edit":
                component = <Formik initialValues={editingPayment} onSubmit={handleEdit} validate={validateCredit}>
                    <CreditCard edit={true} movePage={movePage}/>
                </Formik>;
                break;
            case "paypal":
                component = <Formik initialValues={{
                    kind: Payments.PAYPAL,
                    index: context.values.payments.length,
                    email: "",
                    password: ""
                }} onSubmit={handleAdd} validate={validatePaypal}>
                    <Paypal edit={false} movePage={movePage}/>
                </Formik>;
                break;
            case "paypal_edit":
                component = <Formik initialValues={editingPayment} onSubmit={handleEdit} validate={validatePaypal}>
                    <Paypal edit={true} movePage={movePage}/>
                </Formik>;
                break;
            case "fintech":
                component = <FintechInput/>;
                break;
            default:
                component = <PaymentList>
                    {renderPayments(context.values.payments)}
                </PaymentList>;
                break;            
        }

        return <div className={styles.content_box}>
            {component}
        </div>
    };     

    const renderPayments = (payments) => {                        
        return (
            payments.map((item, i) => {
                return <PaymentItem payment={item} key={i} onEdit={onEditItem} onRemove={handleRemove}/>
            })            
        ); 
    }   

    const onEditItem = (item) => {
        setEditingPayment(item);
        switch (item.kind) {            
            case Payments.CREDIT_CARD:                
                setPageName("card_edit");
                break;
            case Payments.PAYPAL:                
                setPageName("paypal_edit");
            default:
                break;
        }        
    }

    const handleRemove = (index) => {
        arrayHelper.remove(index);
    }    

    const handleCreate = (kind) => {              
        switch (kind) {
            case Payments.CREDIT_CARD:                
                setPageName("card");
                break;        
            case Payments.PAYPAL:                
                setPageName("paypal");
            default:
                break;
        }
    }

    const movePage = (name) => {
        setPageName(name);
    }    

    return (
        <Payment pageName={pageName} movePage={movePage}>
            {renderContent(pageName)}
        </Payment>
    );
}