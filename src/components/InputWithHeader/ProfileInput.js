import React from 'react';
import styles from "./ProfileInput.module.scss";
import { ErrorMessages } from '../../types/ErrorMessages';

export default function ProfileInput(props) {                
    const renderInput = () => {
        if (props.error == undefined) {
            return styles.input;
        }
        else {
            if (props.error != ErrorMessages.CORRECT) {
                return styles.input.concat(" ", styles.input_error_border);
            }
            else {
                return styles.input;
            }
        }        
    }
    
    return (            
        <div className={styles.profileInput}>                              
            <input type={props.type} className={renderInput()} value={props.value} onChange={props.onInput} onBlur={props.onBlur}/>
            <div className={styles.header_box}>
                <span className={styles.header}>{props.header}</span>
                <span className={styles.error_text}>{props.error}</span>
            </div>  
        </div>
    );    
}