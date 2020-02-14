import React, { Component } from 'react';
import PaymentList from "./PaymentList";
import PaymentSelect from "./PaymentSelect";
import CreditCardInput from "./CreditCardInput";
import PaypalInput from "./PaypalInput";
import FintechInput from "./FintechInput";
import styles from "./Payment.module.scss";
import icon from "../../image/addPaymentIcon.svg";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { curPage : props.curPage || "visa", payments : this.props.userInfo.payments };
        
        this.addPayment = this.addPayment.bind(this);
    }

    changePage = (page) => {
        this.setState( { curPage : page } );
    }

    addPayment = (payment) => {
        this.state.payments.push(payment);
    }

    renderContent = (kind) => {
        switch (kind) {
            case "list":
                return <PaymentList list={this.state.payments}/>;
                break;
            case "select":
                return <PaymentSelect onMove={this.changePage}/>;
                break;
            case "visa":
                return <CreditCardInput onBack={this.changePage}/>;
                break;
            case "paypal":
                return <PaypalInput onBack={this.changePage}/>;
                break;
            case "fintech":
                return <FintechInput onBack={this.changePage}/>;
                break;
            default:
                return null;
                break;
        }
    }

    render() {
        return (
            <div className={styles.payment}>
                <div className={styles.panel}/>
                <div className={styles.container}>
                    <span className={styles.header}>*결제 방법을 추가하려면 '추가하기'를 눌러주세요. (최대 3개까지 가능합니다.)</span>
                    <button className={styles.add_button} onClick={ () => this.changePage("select")}>
                        <div className={styles.button_box}>
                            <img src={icon} alt="추가하기 아이콘" className={styles.icon}/>
                            <span className={styles.btn_text}>추가하기</span>
                        </div>                    
                    </button>
                    <div className={styles.content_box}>
                        {
                            this.renderContent(this.state.curPage)
                            // this.state.curPage == "list" ? <PaymentList list={this.state.payments}/> : 
                            // // <PaymentAdd addPayment={this.addPayment} onBack={this.changePage}/>
                            // <PaymentSelect onBack={this.changePage}/>
                        }
                    </div>
                </div>                
            </div>
        );
    }
}

export default Payment;