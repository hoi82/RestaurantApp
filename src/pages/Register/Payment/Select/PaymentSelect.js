import React from 'react';
import styles from "./PaymentSelect.module.scss";
import card from "../../../../image/credit-card.svg";
import paypal from "../../../../image/paypal.svg";
import fintech from "../../../../image/fintech.svg";
import { Payments } from '../../../../types/Variables';

const Item = ({onCreate, icon, header}) => {    
    return (
        <button className={styles.btn} onClick={onCreate}>
            <div className={styles.button_box}>
                <img src={icon} className={styles.logo}/>
                <span className={styles.btn_text}>{header}</span>
            </div>
        </button>        
    )
}

export default function PaymentSelect({movePage, onCreate}) {             
    const handleBack = () => {                
        movePage("list");
    }

    const handleCreateCredit = () => {
        onCreate(Payments.CREDIT_CARD);             
    }

    const handleCreatePaypal = () => {
        onCreate(Payments.PAYPAL);                
    }    

    return (
        <div className={styles.select}>
            <Item value="card" icon={card} header="신용카드" onCreate={handleCreateCredit}/>
            <Item value="paypal" icon={paypal} header="Paypal" onCreate={handleCreatePaypal}/>
            <Item value="fintech" icon={fintech} header="전자결제"/>
            <button value="list" className={styles.back_btn} onClick={handleBack}>
                <span className={styles.btn_text}>돌아가기</span>
            </button>                
        </div>
    );    
}