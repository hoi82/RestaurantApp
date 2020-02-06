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
    }

    renderLogo = () => {
        switch (this.props.info.kind) {
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
        switch (this.props.info.kind) {
            case Payments.VISA:
                return this.props.info.cardNumber;
                break;
            case Payments.PAYPAL:
                return this.props.info.email;
                break;
            case Payments.FINTECH:
                return this.props.info.id;
                break;
            default:
                return "undefined";
                break;
        }
    }

    render() {
        return (
            <div className={styles.item}>
                {this.renderLogo()}
                <div className={styles.content_box}>
                    <span className={styles.info_txt}>{this.renderInfo()}</span>                    
                </div>                
                <div className={styles.button_box}>
                    <button className={styles.modify_btn}>
                        <span className={styles.btn_txt}>수정</span>
                    </button>
                    <button className={styles.remove_btn}>
                        <span className={styles.btn_txt}>삭제</span>
                    </button>
                </div>
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