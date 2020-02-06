import React, { Component } from 'react';
import PaymentList from "./PaymentList";
import PaymentAdd from "./PaymentAdd";
import styles from "./Payment.module.scss";
import icon from "../../image/addPaymentIcon.svg";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { curPage : props.curPage || "list" };

        if (localStorage.getItem("haveToInitPayment") == "true") {
            this.state = { curPage : "list" };
        }
        else {            
            this.state = { curPage : localStorage.getItem("curPaymentPage") || "list" };
        }        

        localStorage.setItem("haveToInitPayment", false);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.curPage != nextState.curPage) {
            return true;
        } else {
            return false;
        }
    }

    changePaymentPage = (page) => {
        this.setState( { curPage : page } );
        localStorage.setItem("curPaymentPage", page);
    }

    //TODO: PaymentList에서 수정, 삭제. 그리고 Localstorage를 이용해 새로고침 후에도 UserInfo 보존해야함.
    render() {
        return (
            <div className={styles.payment}>
                <span className={styles.header}>*결재 방법을 추가하시려면 '추가하기'를 눌러주세요. (최대 3개까지 가능합니다.)</span>
                <button className={styles.add_button} onClick={ () => this.changePaymentPage("add")}>
                    <div className={styles.button_box}>
                        <img src={icon} alt="추가하기 아이콘" className={styles.icon}/>
                        <span className={styles.btn_text}>추가하기</span>
                    </div>                    
                </button>
                <React.Fragment>
                    {
                        this.state.curPage == "list" ? <PaymentList list={this.props.list}/> : <PaymentAdd list={this.props.list} onBack={this.changePaymentPage}/>
                    }
                </React.Fragment>                
            </div>
        );
    }
}

export default Payment;