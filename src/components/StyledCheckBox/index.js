import React, { useState } from 'react';
import styles from "./style.scss";
import { useUIDSeed } from "react-uid";

export default ({checked, onChange, title}) => {
    const uid =useUIDSeed();

    return (
        <div className={styles.cbx_container}>
            <input className={styles.ipx} id={uid("cbx")} type="checkbox" checked={checked} onChange={onChange}/>
            <label className={styles.cbx} htmlFor={uid("cbx")}>
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