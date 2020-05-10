import React from 'react';
import styles from "./style.scss";

export default ({checked, onChange, title}) => {
    return (
        <div className={styles.cbx_container}>
            <input className={styles.ipx} id="cbx" type="checkbox" checked={checked} onChange={onChange}/>
            <label className={styles.cbx} htmlFor="cbx">
                <span>
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>                                            
                    </svg>
                </span>
                <span className={styles.cbx_Text}>{title}</span>
            </label>                                
        </div>
    );
}