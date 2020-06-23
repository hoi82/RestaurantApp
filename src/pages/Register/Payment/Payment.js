import React from 'react';
import styles from "./Payment.module.scss";
import icon from "../../../image/addPaymentIcon.svg";
import { useDispatch } from 'react-redux';
import { showDialog } from '../../../actions/common/dialog';
import { DialogMode } from '../../../types/Variables';

export default function Payment({pageName, movePage, children}) {
    const dispatch = useDispatch();    

    const renderContentPanel = (page) => {         
        let style = styles.content_bg_panel;        
        switch (page) {
            case "list":
                return style.concat(" ", styles.panel_list);                
            case "select":
                return style.concat(" ", styles.panel_select);                
            case "card":
                return style.concat(" ", styles.panel_card);                
            case "card_edit":
                return style.concat(" ", styles.panel_card);                
            case "paypal":
                return style.concat(" ", styles.panel_paypal);                
            case "paypal_edit":
                return style.concat(" ", styles.panel_paypal);                
            case "fintech":
                return style.concat(" ", styles.panel_card);                
            default:
                return style.concat(" ", styles.panel_list); 
        }
    }   
    
    const handleSelect = () => {        
        if (children.length > 3) {
            dispatch(showDialog({
                mode: DialogMode.ALERT,
                coontent: "결재 정보는 최대 3개까지 가능합니다."
            }))            
        }        
        else {            
            movePage("select");
        }
    }     

    return (
        <div className={styles.payment}>            
            <span className={styles.header}>*결제 방법을 추가하려면 '추가하기'를 눌러주세요. (최대 3개까지 가능합니다.)</span>
            <button className={styles.add_button} disabled={pageName != "list"} onClick={handleSelect}>
                <div className={styles.button_box}>
                    <img src={icon} alt="추가하기 아이콘" className={styles.icon}/>
                    <span className={styles.btn_text}>추가하기</span>
                </div>                    
            </button>
            <div className={styles.content_container}>
                <div className={renderContentPanel(pageName)}/>                    
                {children}
            </div>            
        </div>
    );    
}