import React from 'react';
import styles from "./Payment.module.scss";
import icon from "../../image/addPaymentIcon.svg";
import loadable from '@loadable/component';

const PaymentList = loadable(() => import("./PaymentList"));
const PaymentItem = loadable(() => import("./PaymentItem"));
const PaymentSelect = loadable(() => import("./PaymentSelect"));
const CreditCardContainer = loadable(() => import("./CreditCardContainer"));
const PaypalContainer = loadable(() => import("./PaypalContainer"));
const FintechInput = loadable(() => import("./FintechInput"));

export default function Payment(props) {
    const renderContent = (page) => {
        switch (page) {
            case "list":
                return <PaymentList renderedList={renderPayments(props.payments)}/>;
            case "select":
                return <PaymentSelect onCreate={props.onCreate}/>;
            case "card":
                return <CreditCardContainer edit={false}/>;  
            case "card_edit":
                return <CreditCardContainer edit={true}/>;          
            case "paypal":
                return <PaypalContainer edit={false}/>;
            case "paypal_edit":
                return <PaypalContainer edit={true}/>;
            case "fintech":
                return <FintechInput/>;            
            default:
                return null;            
        }
    };

    const renderContentPanel = (page) => {        
        switch (page) {
            case "list":
                return styles.content_bg_panel + " " + styles.panel_list;                
            case "select":
                return styles.content_bg_panel + " " + styles.panel_select;                
            case "card":
                return styles.content_bg_panel + " " + styles.panel_card; 
            case "card_edit":
                return styles.content_bg_panel + " " + styles.panel_card;
            case "paypal":
                return styles.content_bg_panel + " " + styles.panel_paypal;
            case "paypal_edit":
                return styles.content_bg_panel + " " + styles.panel_paypal;
            case "fintech":
                return styles.content_bg_panel + " " + styles.panel_card;                
            default:
                return null;                
        }
    }    

    const renderPayments = () => {                
        return (
            props.payments.map((item, i) => {
                return <PaymentItem payment={item} key={i} onEdit={props.onEditItem} onRemove={props.onRemoveItem}/>
            })            
        ); 
    }    
          
    return (
        <div className={styles.payment}>
            <div className={styles.panel}/>
            <div className={styles.container}>
                <span className={styles.header}>*결제 방법을 추가하려면 '추가하기'를 눌러주세요. (최대 3개까지 가능합니다.)</span>
                <button className={styles.add_button} disabled={props.page == "list" ? false : true} onClick={props.onSelect}>
                    <div className={styles.button_box}>
                        <img src={icon} alt="추가하기 아이콘" className={styles.icon}/>
                        <span className={styles.btn_text}>추가하기</span>
                    </div>                    
                </button>
                <div className={styles.content_container}>
                    <div className={renderContentPanel(props.page)}/>
                    <div className={styles.content_box}>
                        {renderContent(props.page)}
                    </div>
                </div>                
            </div>                
        </div>
    );    
}