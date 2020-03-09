import React from 'react';
import { Payments } from "../../data/Variables";
import styles from "./PaymentItem.module.scss";
import card from "../../image/visa.svg";
import paypal from "../../image/paypal.svg";
import fintech from "../../image/fintech.svg";
import unknown from "../../image/test.svg";

export default function PaymentItem(props) {        
    const renderLogo = () => {
        switch (props.payment.kind) {
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
        switch (props.payment.kind) {
            case Payments.CREDIT_CARD:
                return props.payment.number;                
            case Payments.PAYPAL:
                return props.payment.email;                
            case Payments.FINTECH:
                return payment.id;                
            default:
                return "undefined";                
        }
    }    
    
    const handleEdit = (e) => {        
        props.onEdit(props.payment);        
    }

    const handleRemove = (e) => {        
        props.onRemove(props.payment.id);        
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
                <button className={styles.remove_btn} onClick={handleRemove}>
                    <span className={styles.btn_txt}>삭제</span>
                </button>
            </div>    
        </div>
    );    
}