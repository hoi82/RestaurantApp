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
        this.state = { curPage : props.curPage || "list", payments : this.props.userInfo.payments };
        
        this.addPayment = this.addPayment.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.curPage != nextState.curPage)
            return true;
        else
            return false;
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

    toggleContentClass = (kind) => {
        switch (kind) {
            case "list":
                return styles.content_box;
                break;
            case "select":
                return styles.content_box;
                break;
            case "visa":
                return styles.content_box_small;
                break;
            case "paypal":
                return styles.content_box_small;
                break;
            case "fintech":
                return styles.content_box_small;
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
                    <div className={this.toggleContentClass(this.state.curPage)}>
                        {                            
                            this.renderContent(this.state.curPage)                            
                        }
                    </div>
                </div>                
            </div>
        );
    }
}

export default Payment;