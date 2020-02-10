import React, { Component } from 'react';
import PaymentList from "./PaymentList";
import PaymentAdd from "./PaymentAdd";
import styles from "./Payment.module.scss";
import icon from "../../image/addPaymentIcon.svg";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { curPage : props.curPage || "list", payments : this.props.userInfo.payments };

        this.addPayment = this.addPayment.bind(this);
    }

    changePage = (page) => {
        this.setState( { curPage : page } );
    }

    addPayment = (payment) => {
        this.state.payments.push(payment);
    }

    render() {
        return (
            <div className={styles.payment}>
                <span className={styles.header}>*결재 방법을 추가하시려면 '추가하기'를 눌러주세요. (최대 3개까지 가능합니다.)</span>
                <button className={styles.add_button} onClick={ () => this.changePage("add")}>
                    <div className={styles.button_box}>
                        <img src={icon} alt="추가하기 아이콘" className={styles.icon}/>
                        <span className={styles.btn_text}>추가하기</span>
                    </div>                    
                </button>
                <React.Fragment>
                    {
                        this.state.curPage == "list" ? <PaymentList list={this.state.payments}/> : 
                        <PaymentAdd addPayment={this.addPayment} onBack={this.changePage}/>
                    }
                </React.Fragment>                
            </div>
        );
    }
}

export default Payment;