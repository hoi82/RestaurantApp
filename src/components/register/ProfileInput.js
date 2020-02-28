import React from 'react';
import styles from "./ProfileInput.module.scss";
import { useDispatch } from 'react-redux';

export default function ProfileInput(props) {    
    const handleInput = (e) => {
        let value = e.target.value.trim();
        props.onChange(value);
        e.target.data = e.target.value;        
    }

    const handleBlur = (e) => {           
        if (e.target.data != undefined) {            
            props.onRefresh();
        }           
    }

    
    return (            
        <div className={styles.profileInput}>
            <div className={styles.header_box}>
                <span className={styles.header}>{props.header}</span>
                <span className={styles.error_text}>{props.error}</span>
            </div>                    
            <input type={props.type} defaultValue={props.value} onInput={handleInput} onBlur={handleBlur}/>                                                
        </div>
    );    
}