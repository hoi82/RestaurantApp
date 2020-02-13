import React, { Component } from 'react';
import { Payments } from "../common/Variables";
import styles from "./PaymentAddBox.module.scss";

class PaymentAddBox extends Component {
    constructor(props) {
        super(props);

        this.paymentInfo.kind = this.props.kind;

        this.state = { error : "" }
    }
    
    paymentInfo = { kind: "", email: "", cardNumber: "", id: "" }

    handleChange = (value) => {        
        switch (this.props.kind) {
            case Payments.VISA:                
                {
                    if (/[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}/.test(value.cardNumber))
                        this.setState({ error : "" });
                    else
                        this.setState({ error : "카드번호가 올바르지 않습니다."});
                }
                break;
            case Payments.PAYPAL:                
                {
                    if (/^[a-z0-9\_]{3,}\@[a-z0-9\_]{3,}\.[a-z0-9]+(\.[a-z0-9]+)?/i.test(value.email))
                        this.setState({ error : "" });
                    else
                        this.setState({ error : "올바르지 않은 이메일 형식입니다."});                    
                }                
                break;
            case Payments.FINTECH:            
                {
                    if (/[a-z0-9]+/i.test(value.id))
                        this.setState({ error : ""});                                       
                    else
                        this.setState({ error : "ID를 입력해주세요."});
                }                
                break;
            default:
                break;
        }
        Object.assign(this.paymentInfo, value);
    }

    renderInput = () => {
        switch (this.props.kind) {
            case Payments.PAYPAL:
                return <input type="email" onChange={ (e) => {this.handleChange({ email : e.target.value})} }/>;
                break;
            case Payments.VISA:
                return <input type="text" onChange={ (e) => {this.handleChange({ cardNumber : e.target.value})} }/>;
                break;
            case Payments.FINTECH:
                return <input type="text" onChange={ (e) => {this.handleChange({ id : e.target.value})} }/>;
                break;
            default:
                return null;
                break;
        }
    }    

    handleClick = () => {        
        if (this.state.error == "") {
            this.props.onAdd(this.paymentInfo);
            this.props.onBack("list");
        }        
    }

    render() {        
        return (
            <div className={styles.box_container}>
                <button className={styles.box_button}>
                    <div className={styles.box_btn_container}>
                        <img src={this.props.logo} alt={this.props.alt} className={styles.logo}/>
                        <span className={styles.item_btn_txt}>{this.props.kind}</span>
                    </div>
                </button>
                <div className={styles.input_container}>
                    <div className={styles.input_box}>
                        <div className={styles.header_box}>
                            <span className={styles.header_text}>{this.props.header}</span>
                            <span className={styles.error_text}>{this.state.error}</span>
                        </div>                         
                        <React.Fragment>
                            {this.renderInput()}
                        </React.Fragment>
                    </div>
                    <button className={styles.reg_btn} onClick={this.handleClick}><span className={styles.reg_txt}>등록</span></button>
                </div>
            </div>            
        );
    }
}

export default PaymentAddBox;