import React from 'react';
import styles from "./CreditCardInput.module.scss";
import close from "../../../../../image/close.svg";
import { ErrorMessages } from "../../../../../types/ErrorMessages";

export default function CreditCardInput(props) {             
    const handleNumber = (e) => {       
        var code = e.keyCode;
        
        if (code > 47 && code < 58) {
          return;
        }
        
        if (e.ctrlKey || e.metaKey || e.altKey) {
          return;
        }

        if (code === 8 || code === 9 || code === 36 || code === 35 || code === 37 ||
            code === 39 || code === 8 || code === 46) {
          return;
        }
        event.preventDefault();
    }

    const handleExpire = (e) => {
        handleNumber(e);        
        const val = e.target.value.replace(/\D/g,"");
        
        if (val.length == 0) {
            if (e.key == "1" || e.key == "2") {
                return true;
            }
            else {

            }
        }
        else {

        }     
    }        

    const handleCVC = (e) => {
        handleNumber(e);
    }     
    
    const toggleInputClass = (basis, error) => {
        if (error == ErrorMessages.CORRECT) {
            return basis.concat(" ", styles.normal_input);
        }
        else {
            return basis.concat(" ", styles.error_input);
        }
    }
        
    return (        
        <div className={styles.container}>                                             
            <div className={styles.num_box}>
                <span>카드 번호</span>                
                <input name="number" type="text" className={toggleInputClass(styles.num_input, props.numberError)} maxLength="19" placeholder="1234 1234 1234 1234" autoComplete="off" value={props.number} 
                onKeyDown={handleNumber} onChange={props.functions.change} onBlur={props.functions.blur}/>
                <span className={styles.error_text}>{props.numberError}</span>
            </div>
            <div className={styles.etc_box}>
                <div className={styles.expire_box}>
                    <span>만료일</span>                    
                    <input name="expire" type="text" className={toggleInputClass(styles.expire_input, props.expireError)} maxLength="5" placeholder="MM/YY" autoComplete="cc-exp" value={props.expire}
                    onKeyDown={handleExpire} onChange={props.functions.change} onBlur={props.functions.blur}/>
                    <span className={styles.error_text}>{props.expireError}</span>
                </div>
                <div className={styles.cvc_box}>
                    <span>CVC</span>                    
                    <input name="cvc" type="password" className={toggleInputClass(styles.cvc_input, props.cvcError)} maxLength="3" autoComplete="off" value={props.cvc}
                    onKeyDown={handleCVC} onChange={props.functions.change} onBlur={props.functions.blur}/>
                    <span className={styles.error_text}>{props.cvcError}</span>
                </div>
            </div>   
            <div className={styles.name_box}>
                <span>소유자 이름</span>
                <input name="name" type="text" className={toggleInputClass(styles.name_input, props.cashHolderError)} placeholder="John Doe" value={props.cashHolder}
                onChange={props.functions.change} onBlur={props.functions.blur}/>
                <span className={styles.error_text}>{props.cashHolderError}</span>
            </div>             
            <button className={styles.add_btn} onClick={props.edit ? props.functions.edit : props.functions.add}>
                <span className={styles.add_btn_text}>
                    {props.edit ? "저장하기" : "추가하기"}
                </span>
            </button>
            <button className={styles.close_btn} onClick={props.functions.close}>
                <img src={close} className={styles.close_icon}/>
            </button>                
        </div>
    );    
}