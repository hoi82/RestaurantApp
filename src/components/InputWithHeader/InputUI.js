import React, { useState, useEffect } from 'react';
import styles from "./style.scss";

export default function InputUI(props) {
    const [error, setError] = useState("");

    useEffect(()=> {
        if (props.forceUpdate) {
            setError(props.validator(props.value));
        }        
    }, [props.forceUpdate]);

    const renderInput = () => {        
        if (error != "") {
            return styles.input.concat(" ", styles.input_error_border);            
        }        
        else {
            return styles.input;
        }
    }

    const handleBlur = (e) => {
        setError(props.validator(e.target.value));
    }
    
    return (            
        <div className={styles.profileInput}>                              
            <input type={props.type} className={renderInput()} value={props.value} onChange={props.onChange} onBlur={handleBlur}/>
            <div className={styles.header_box}>
                <span className={styles.header}>{props.header}</span>
                <span className={styles.error_text}>{error}</span>
            </div>  
        </div>
    );    
}