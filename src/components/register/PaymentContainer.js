import React from 'react';
import Payment from './Payment';
import { useSelector, useDispatch } from 'react-redux';
import { deletePayment } from '../../actions/register/payments';
import { navigatePayment } from '../../actions/register/registerNavigation';
import { Payments } from '../../data/Variables';
import { assignCredit, newCreditCard } from '../../actions/register/creditCard';
import { newPaypal, assignPaypal } from '../../actions/register/paypal';

export default function PaymentContainer(props) {
    const payments = useSelector((store) => store.payments.list);
    const page = useSelector((store) => store.navigation.payment);
    const dispatch = useDispatch();

    const onEditItem = (item) => {                                  
        switch (item.kind) {
            case Payments.CREDIT_CARD:
                dispatch(assignCredit(item));
                dispatch(navigatePayment("card_edit"));
                break;
            case Payments.PAYPAL:
                dispatch(assignPaypal(item));
                dispatch(navigatePayment("paypal_edit"));
            default:
                break;
        }        
    }

    const handleRemove = (index) => {
        dispatch(deletePayment(index));        
    }

    const handleSelect = () => {
        dispatch(navigatePayment("select"));
    }

    const handleCreate = (kind) => {              
        switch (kind) {
            case Payments.CREDIT_CARD:
                dispatch(newCreditCard());
                break;        
            case Payments.PAYPAL:
                dispatch(newPaypal());
            default:
                break;
        }
    }

    return (
        <Payment payments={payments} page={page} onEditItem={onEditItem} onRemoveItem={handleRemove} onSelect={handleSelect} onCreate={handleCreate}/>
    );
}