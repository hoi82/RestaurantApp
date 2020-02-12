import React, { Component } from 'react';
import { Payments } from "../common/Variables";
import styles from "./PaymentItem.module.scss";
import visa from "../../image/visa.svg";
import paypal from "../../image/paypal.svg";
import fintech from "../../image/fintech.svg";
import unknown from "../../image/test.svg";

class PaymentItem extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            payment : this.props.item,
            isEditable : false,
            editingValue : ""
        }
    }

    renderLogo = () => {
        switch (this.state.payment.kind) {
            case Payments.VISA:
                return <img src={visa} alt="비자 카드 로고" className={styles.logo}/>;
                break;
            case Payments.PAYPAL:
                return <img src={paypal} alt="Paypal 로고" className={styles.logo}/>;
                break;
            case Payments.FINTECH:
                return <img src={fintech} alt="전자결제 로고"className={styles.logo}/>;
                break;
            default:
                return <img src={unknown} alt="미지정 로고" className={styles.logo}/>;
                break;
        }
    }

    renderInfo = () => {
        switch (this.state.payment.kind) {
            case Payments.VISA:
                return this.state.payment.cardNumber;
                break;
            case Payments.PAYPAL:
                return this.state.payment.email;
                break;
            case Payments.FINTECH:
                return this.state.payment.id;
                break;
            default:
                return "undefined";
                break;
        }
    }

    handleSubmit = (e) => {
        if (e.key == "Enter") {
            this.submit();            
        }        
    }

    clickSubmit = (e) => {
        this.submit();
    }

    submit = () => {
        if (this.state.editingValue !== "") {            
            switch (this.state.payment.kind) {
                case Payments.VISA:
                    this.state.payment.cardNumber = this.state.editingValue;
                    break;
                case Payments.PAYPAL:
                    this.state.payment.email = this.state.editingValue;
                    break;
                case Payments.FINTECH:
                    this.state.payment.id = this.state.editingValue;
                    break;
                default:                    
                    break;
            }             
        }        
        this.rollBack();
    }

    rollBack = () => {
        this.setState({isEditable : false}, () => {this.state.editingValue = ""});
    }

    render() {
        return (
            <div className={styles.item}>
                {this.renderLogo()}
                {this.state.isEditable ? 
                    <React.Fragment>
                        <div className={styles.content_box}>
                            <input type="text" value={this.state.editingValue} onChange={(e)=>this.setState({editingValue: e.target.value})} onKeyPress={this.handleSubmit}/>
                        </div> 
                        <div className={styles.button_box}>
                            <button className={styles.submit_btn} onClick={this.submit}>
                                <span className={styles.btn_txt}>확인</span>
                            </button>
                            <button className={styles.cancel_btn} onClick={this.rollBack}>
                                <span className={styles.btn_txt}>취소</span>
                            </button>
                        </div>
                    </React.Fragment>                    
                    :
                    <React.Fragment>
                        <div className={styles.content_box}>
                            <span className={styles.info_txt}>{this.renderInfo()}</span>                    
                        </div>       
                        <div className={styles.button_box}>
                            <button className={styles.modify_btn} onClick={() => this.setState({ isEditable : true })}>
                                <span className={styles.btn_txt}>수정</span>
                            </button>
                            <button className={styles.remove_btn} onClick={() => this.props.onRemove(this.props.id)}>
                                <span className={styles.btn_txt}>삭제</span>
                            </button>
                        </div>         
                    </React.Fragment>                    
                }                                
            </div>
        );
    }
}

PaymentItem.defaultProps = {
    info: {
        kind: null,
        cardNumber: "1111-1111-1111-1111",
        email: "aaa@aaa.com",
        id: "bbbb"
    }
}

export default PaymentItem;