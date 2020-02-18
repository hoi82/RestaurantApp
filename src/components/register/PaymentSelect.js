import React, { Component } from 'react';
import styles from "./PaymentSelect.module.scss";
import card from "../../image/credit-card.svg";
import paypal from "../../image/paypal.svg";
import fintech from "../../image/fintech.svg";

class PaymentSelect extends Component {
    render() {
        return (
            <div className={styles.select}>
                <button className={styles.btn} onClick={ () => this.props.onMove("card")}>
                    <div className={styles.button_box}>
                        <img src={card} className={styles.logo}/>
                        <span className={styles.btn_text}>신용카드</span>
                    </div>                    
                </button>
                <button className={styles.btn} onClick={ () => this.props.onMove("paypal")}>
                    <div className={styles.button_box}>
                        <img src={paypal} className={styles.logo}/>
                        <span className={styles.btn_text}>Paypal</span>
                    </div>                    
                </button>
                <button className={styles.btn} onClick={ () => this.props.onMove("fintech")}>
                    <div className={styles.button_box}>
                        <img src={fintech} className={styles.logo}/>
                        <span className={styles.btn_text}>전자결제</span>
                    </div>                    
                </button>
                <button className={styles.back_btn} onClick={ () => this.props.onMove("list")}>
                    <span className={styles.btn_text}>돌아가기</span>
                </button>                
            </div>
        );
    }
}

export default PaymentSelect;