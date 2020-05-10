import React, { useState, useEffect } from 'react';
import styles from "./style.scss";

const InputUI = React.forwardRef(({forceUpdate, type, value, onChange, validator, header}, ref) => {
        const [error, setError] = useState("");                
        useEffect(()=> {
            if (forceUpdate) {
                setError(validator(value));
            }        
        }, [forceUpdate]);
    
        const renderInput = () => {        
            if (error != "") {
                return styles.input.concat(" ", styles.input_error_border);            
            }        
            else {
                return styles.input;
            }
        }
    
        const handleBlur = (e) => {
            setError(validator(e.target.value));
        }
        
        return (            
            <div className={styles.profileInput}>                              
                <input type={type} ref={ref} className={renderInput()} value={value} onChange={onChange} onBlur={handleBlur}/>
                <div className={styles.header_box}>
                    <span className={styles.header}>{header}</span>
                    <span className={styles.error_text}>{error}</span>
                </div>  
            </div>
        );    
    }
); 

export default InputUI;