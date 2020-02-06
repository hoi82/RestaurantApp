import React, { Component } from 'react';
import PaymentAddBox from "./PaymentAddBox";
import { Payments } from "../common/Variables";
import styles from "./PaymentAdd.module.scss";
import visa from "../../image/visa.svg";
import paypal from "../../image/paypal.svg";
import fintech from "../../image/fintech.svg";


class PaymentAdd extends Component {
    constructor(props) {
        super(props);

        this.addPayment = this.addPayment.bind(this);
    }

    addPayment = (item) => {
        this.props.list.push(item);
        this.props.onBack("list");
        console.log(this.props.list);
    }

    render() {
        return (
            <div className={styles.add}>
                <PaymentAddBox kind={Payments.VISA} logo={visa} alt="카드 로고" header="카드 번호" onAdd={this.addPayment}/>
                <PaymentAddBox kind={Payments.PAYPAL} logo={paypal} alt="Paypal 로고" header="이메일" onAdd={this.addPayment}/>
                <PaymentAddBox kind={Payments.FINTECH} logo={fintech} alt="전자 결재 로고" header="계정 ID" onAdd={this.addPayment}/>  
                <button className={styles.back_btn} onClick={ (e) => this.props.onBack("list")}>
                    <span className={styles.back_txt}>돌아가기</span>
                </button>              
            </div>
        );
    }
}

export default PaymentAdd;