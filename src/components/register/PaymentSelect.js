import React from 'react';
import styles from "./PaymentSelect.module.scss";
import card from "../../image/credit-card.svg";
import paypal from "../../image/paypal.svg";
import fintech from "../../image/fintech.svg";
import { useDispatch } from 'react-redux';
import { navigatePayment } from '../../actions/registerNavigation';

const PaymentSelectItem = (props) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(navigatePayment(e.target.value));
    }

    return (
        <button value={props.value} className={styles.btn} onClick={handleClick}>
            <div className={styles.button_box}>
                <img src={props.icon} className={styles.logo}/>
                <span className={styles.btn_text}>{props.header}</span>
            </div>
        </button>        
    )
}

export default function PaymentSelect() {     
    const dispatch = useDispatch();
    
    const handleBack = () => {
        dispatch(navigatePayment("list"));
    }

    return (
        <div className={styles.select}>
            <PaymentSelectItem value="card" icon={card} header="신용카드"/>
            <PaymentSelectItem value="paypal" icon={paypal} header="Paypal"/>
            <PaymentSelectItem value="fintech" icon={fintech} header="전자결제"/>                        
            <button value="list" className={styles.back_btn} onClick={handleBack}>
                <span className={styles.btn_text}>돌아가기</span>
            </button>                
        </div>
    );    
}