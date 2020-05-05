import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./Profile.module.scss";

export default (props) => {
    const dispatch = useDispatch();    
    return (
        <div className={styles.profile}>            
            <div className={styles.container}>
                <div className={styles.nameplate}>
                    <span className={styles.name}>Lorem Ipsum</span>
                    <span className={styles.email}>Lorem Ipsum@ipsum.com</span>
                </div>       
                <div className={styles.toolbox}>
                    <button className={styles.tool_button}>
                        <img className={styles.setting_Icon}/>                        
                    </button>
                    <button className={styles.tool_button}>
                        <img className={styles.logout_Icon}/>
                    </button>                    
                </div>         
            </div>
        </div>
    );
}