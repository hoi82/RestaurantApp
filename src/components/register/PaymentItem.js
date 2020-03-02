import React from 'react';
import { Payments } from "../../data/Variables";
import styles from "./PaymentItem.module.scss";
import card from "../../image/visa.svg";
import paypal from "../../image/paypal.svg";
import fintech from "../../image/fintech.svg";
import unknown from "../../image/test.svg";
import { useSelector, useDispatch } from 'react-redux';
import { navigatePayment } from '../../actions/registerNavigation';

export default function PaymentItem(props) {
    const payment = useSelector((store) => store.register.payments[props.id]); 
    const dispatch = useDispatch();    
    
    const renderLogo = () => {
        switch (payment.kind) {
            case Payments.CREDIT_CARD:
                return <img src={card} alt="비자 카드 로고" className={styles.logo}/>;                
            case Payments.PAYPAL:
                return <img src={paypal} alt="Paypal 로고" className={styles.logo}/>;                
            case Payments.FINTECH:
                return <img src={fintech} alt="전자결제 로고"className={styles.logo}/>;                
            default:
                return <img src={unknown} alt="미지정 로고" className={styles.logo}/>;                
        }
    }

    const renderInfo = () => {        
        switch (payment.kind) {
            case Payments.CREDIT_CARD:
                return payment.detail.creditCard.number;                
            case Payments.PAYPAL:
                return payment.detail.paypal.email;                
            case Payments.FINTECH:
                return payment.id;                
            default:
                return "undefined";                
        }
    }    
    
    const handleEdit = (e) => {
        dispatch(navigatePayment("card", true, payment));
    }
    
    return (
        <div className={styles.item}>
            {renderLogo()}
            <div className={styles.content_box}>
                <span className={styles.info_txt}>{renderInfo()}</span>                    
            </div>       
            <div className={styles.button_box}>
                <button className={styles.modify_btn} onClick={handleEdit}>
                    <span className={styles.btn_txt}>수정</span>
                </button>
                <button className={styles.remove_btn}>
                    <span className={styles.btn_txt}>삭제</span>
                </button>
            </div>    
        </div>
    );    
}

PaymentItem.defaultProps = {
    info: {
        kind: null,
        cardNumber: "1111-1111-1111-1111",
        email: "aaa@aaa.com",
        id: "bbbb"
    }
}