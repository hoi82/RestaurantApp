import React from 'react';
import PaymentList from "./PaymentList";
import PaymentSelect from "./PaymentSelect";
import CreditCardInput from "./CreditCardInput";
import PaypalInput from "./PaypalInput";
import FintechInput from "./FintechInput";
import styles from "./Payment.module.scss";
import icon from "../../image/addPaymentIcon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { navigatePayment } from '../../actions/registerNavigation';

export default function Payment(props) {        
    const dispatch = useDispatch();    
    const page = useSelector((store) => store.registerNavigation.payment);    

    const renderContent = (page) => {
        switch (page) {
            case "list":
                return <PaymentList/>;
                break;
            case "select":
                return <PaymentSelect/>;
                break;
            case "card":
                return <CreditCardInput/>;
                break;
            case "paypal":
                return <PaypalInput/>;
                break;
            case "fintech":
                return <FintechInput/>;
                break;
            default:
                return null;
                break;
        }
    }

    const toggleContentClass = (page) => {
        switch (page) {
            case "list":
                return styles.content_box;
                break;
            case "select":
                return styles.content_box;
                break;
            case "card":
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
          
    return (
        <div className={styles.payment}>
            <div className={styles.panel}/>
            <div className={styles.container}>
                <span className={styles.header}>*결제 방법을 추가하려면 '추가하기'를 눌러주세요. (최대 3개까지 가능합니다.)</span>
                <button className={styles.add_button} disabled={page == "list" ? false : true} onClick={ () => dispatch(navigatePayment("select"))}>
                    <div className={styles.button_box}>
                        <img src={icon} alt="추가하기 아이콘" className={styles.icon}/>
                        <span className={styles.btn_text}>추가하기</span>
                    </div>                    
                </button>
                <div className={toggleContentClass(page)}>
                    {renderContent(page)}
                </div>
            </div>                
        </div>
    );    
}