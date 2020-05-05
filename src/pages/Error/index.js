import React from 'react';
import styles from "./style.scss";

export default (props) => {
    return (        
        <div className={styles.panel}>
            <div className={styles.title}>
                <img className={styles.image}/>
                <span>Error!</span>
            </div>
            <div className={styles.content}>
                <p>{props.message}</p>                
            </div>
        </div>                    
    );
}