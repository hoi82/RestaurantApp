import React from 'react';
import Payment from './Payment';
import { useSelector, useDispatch } from 'react-redux';
import { deletePayment } from '../../../actions/register/payments';
import { navigatePayment } from '../../../actions/register/registerNavigation';
import { Payments, DialogMode } from '../../../types/Variables';
import { assignCredit, newCreditCard } from '../../../actions/register/creditCard';
import { newPaypal, assignPaypal } from '../../../actions/register/paypal';
import { showDialog } from '../../../actions/common/dialog';

export default function PaymentContainer(props) {
    const payments = useSelector((store) => store.register.payments.list);
    const page = useSelector((store) => store.register.navigation.payment);
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
        if (payments.length <= 3) {
            dispatch(navigatePayment("select"));
        }        
        else {
            dispatch(showDialog({
                mode: DialogMode.ALERT,
                coontent: "결재 정보는 최대 3개까지 가능합니다."
            }))
        }
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