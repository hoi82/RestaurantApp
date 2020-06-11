import React, { useState, useEffect } from 'react';
import styles from "./style.scss";
import Validator from '../../utils/Validator';
import { ErrorMessages } from '../../types/ErrorMessages';
import { handleNumber } from './utils';
import Formatter from '../../utils/Formatter';
import warning from "../../image/ccwarning.svg";
import visaLogo from "../../image/visalogo.svg";
import masterLogo from "../../image/masterlogo.svg";
import jcbLogo from "../../image/jcblogo.svg";

export default function CreditNumberInput({forceUpdate, value, onChange}) {
    const [cardInfo, setCardInfo] = useState(null);    

    useEffect(()=> {
        if (forceUpdate) {
            setCardInfo(Validator.validateCreditNumber(value));
        }        
    }, [forceUpdate]);

    const renderInput = () => {        
        if (cardInfo && cardInfo.error != ErrorMessages.CORRECT) {
            return styles.cardnumber_input.concat(" ", styles.input_error_border);            
        }        
        else {
            return styles.cardnumber_input;
        }
    }

    const renderCardLogo = (card) => {
        if (!card)
            return warning;        
        switch (card.name) {
            case "visa":
                return visaLogo;
            case "master":
                return masterLogo;
            case "jcb":
                return jcbLogo;
            default:
                return warning;
        }
    }

    const handleBlur = (e) => {        
        setCardInfo(Validator.validateCreditNumber(e.target.value));
    }

    const handleChange = (e) => {
        e.target.value = Formatter.formatCardNumber(e.target.value);
        if (onChange)
            onChange(e);
    }

    return (
        <div className={styles.profileInput}>
            <input id="iCardNumber" type="text" className={renderInput()} value={value} onChange={handleChange} onKeyDown={handleNumber} onBlur={handleBlur} maxLength="19" placeholder="1234 1234 1234 1234" autoComplete="off"/>
            <label htmlFor="iCardNumber" className={styles.input_card_label}>
                <img src={renderCardLogo(cardInfo)}/>
            </label>
            <div className={styles.header_box}>
                <span className={styles.header}>카드 번호</span>
                <span className={styles.error_text}>{cardInfo ? cardInfo.error : ""}</span>
            </div>  
        </div>
    );
}