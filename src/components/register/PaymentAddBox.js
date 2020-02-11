import React, { Component } from 'react';
import { Payments } from "../common/Variables";
import styles from "./PaymentAddBox.module.scss";

class PaymentAddBox extends Component {
    constructor(props) {
        super(props);

        this.paymentInfo.kind = this.props.kind;
    }
    //TODO: 유효성 검사 구현해야함. 내일은 여기부터.
    paymentInfo = { kind: "", email: "", cardNumber: "", id: "" }

    handleChange = (value) => {
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
        this.props.onAdd(this.paymentInfo);
        this.props.onBack("list");
    }

    render() {        
        return (
            <div className={styles.box_container}>
                <button className={styles.box_button}>
                    <div className={styles.box_btn_container}>
                        <img src={this.props.logo} alt={this.props.alt} className={styles.logo}/>
                        <span className={styles.item_btn_txt}>visa</span>
                    </div>
                </button>
                <div className={styles.input_container}>
                    <div className={styles.input_box}> 
                        <span className={styles.input_header}>{this.props.header}</span>
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