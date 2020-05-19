import React from 'react';
import styles from "./style.scss";
import image from "../../image/404-error.svg";

export default ({staticContext, history}) => {      
    if (staticContext)
    {
        staticContext.status = "404";        
    }    

    const handleClick = (e) => {        
        history.goBack();
    }

    return (
        <div className={styles.notFound}>
            <div className={styles.panel}>
                <img className={styles.img} src={image}/>
                <div className={styles.text_container}>
                    <span className={styles.title}>Oops!</span>                    
                    <span className={styles.message}>Page is not found!</span>
                </div>
            </div>    
            <button onClick={handleClick}>Go Back</button>        
        </div>
    );
}