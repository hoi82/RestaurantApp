import React, { useState } from 'react';
import { Payments } from "../../data/Variables";
import styles from "./PaymentItem.module.scss";
import visa from "../../image/visa.svg";
import paypal from "../../image/paypal.svg";
import fintech from "../../image/fintech.svg";
import unknown from "../../image/test.svg";
import { useSelector } from 'react-redux';

export default function PaymentItem(props) {
    const payment = useSelector((store) => store.register.payments[props.id]);
    const [isEditable, setIsEditable] = useState(false);
    let editingValue = "";  

    //TODO: submit 과정 마무리해야됨.
    const renderLogo = () => {
        switch (payment.kind) {
            case Payments.VISA:
                return <img src={visa} alt="비자 카드 로고" className={styles.logo}/>;                
            case Payments.PAYPAL:
                return <img src={paypal} alt="Paypal 로고" className={styles.logo}/>;                
            case Payments.FINTECH:
                return <img src={fintech} alt="전자결제 로고"className={styles.logo}/>;                
            default:
                return <img src={unknown} alt="미지정 로고" className={styles.logo}/>;                
        }
    }

    const renderInfo = () => {
        switch (payment.kind) {
            case Payments.VISA:
                return payment.cardNumber;                
            case Payments.PAYPAL:
                return payment.email;                
            case Payments.FINTECH:
                return payment.id;                
            default:
                return "undefined";                
        }
    }

    const handleSubmit = (e) => {
        if (e.key == "Enter") {
            submit();            
        }        
    }

    const clickSubmit = (e) => {
        submit();
    }

    const submit = () => {
        if (editingValue !== "") {            
            switch (payment.kind) {
                case Payments.VISA:
                    payment.cardNumber = editingValue;
                    break;
                case Payments.PAYPAL:
                    payment.email = editingValue;
                    break;
                case Payments.FINTECH:
                    payment.id = editingValue;
                    break;
                default:                    
                    break;
            }             
        }        
        rollBack();
    }

    rollBack = () => {
        setIsEditable(false);
        editingValue = "";     
    }
    
    return (
        <div className={styles.item}>
            {renderLogo()}
            {isEditable ? 
                <React.Fragment>
                    <div className={styles.content_box}>
                        <input type="text" value={editingValue} onChange={(e) => editingValue = e.target.value} onKeyPress={handleSubmit}/>
                    </div> 
                    <div className={styles.button_box}>
                        <button className={styles.submit_btn} onClick={submit}>
                            <span className={styles.btn_txt}>확인</span>
                        </button>
                        <button className={styles.cancel_btn} onClick={rollBack}>
                            <span className={styles.btn_txt}>취소</span>
                        </button>
                    </div>
                </React.Fragment>                    
                :
                <React.Fragment>
                    <div className={styles.content_box}>
                        <span className={styles.info_txt}>{renderInfo()}</span>                    
                    </div>       
                    <div className={styles.button_box}>
                        <button className={styles.modify_btn} onClick={() => setIsEditable(true)}>
                            <span className={styles.btn_txt}>수정</span>
                        </button>
                        <button className={styles.remove_btn}>
                            <span className={styles.btn_txt}>삭제</span>
                        </button>
                    </div>         
                </React.Fragment>                    
            }                                
        </div>
    );    
}

PaymentItem.defaultProps = {
    info: {
        kind: null,
        cardNumber: "1111-1111-1111-1111",
        email: "aaa@aaa.com",
        id: "bbbb"
    }
}