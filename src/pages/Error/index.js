import React from 'react';
import styles from "./style.scss";
import image from "../../image/error.svg";

export default ({message}) => {
    return (        
        <div className={styles.panel}>
            <div className={styles.title}>
                <img className={styles.image} src={image}/>
                <span>Error!</span>
            </div>
            <div className={styles.content}>
                <p>{message}</p>                
            </div>
        </div>                    
    );
}