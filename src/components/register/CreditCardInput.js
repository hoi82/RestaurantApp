import React, { Component } from 'react';
import styles from "./CreditCardInput.module.scss";
import close from "../../image/close.svg";

class CreditCardInput extends Component {
    constructor(props) {
        super(props);        
    }

    //TODO: 여기서부터 해야됨
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.num_box}>
                    <span>카드 번호</span>
                    <input type="text" className={styles.num_input} maxLength="19" placeholder="XXXX-XXXX-XXXX-XXXX"/>
                </div>
                <div className={styles.etc_box}>
                    <div className={styles.expire_box}>
                        <span>만료일</span>
                        <input type="text" className={styles.expire_input} maxLength="5" placeholder="MM/YY"/>
                    </div>
                    <div className={styles.cvc_box}>
                        <span>CVC</span>
                        <input type="password" className={styles.cvc_input} maxLength="3"/>
                    </div>
                </div>
                <button className={styles.close_btn} onClick={ (e) => {this.props.onBack("select")}}>
                    <img src={close} className={styles.close_icon}/>
                </button>                
            </div>
        );
    }
}

export default CreditCardInput;