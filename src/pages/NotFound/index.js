import React from 'react';
import styles from "./style.scss";

export default (props) => { 
    console.log(props);   
    if (props.staticContext)
    {
        props.staticContext.status = "404";        
    }    

    const handleClick = (e) => {        
        props.history.goBack();
    }

    return (
        <div className={styles.notFound}>
            <div className={styles.panel}>
                <img className={styles.img}/>
                <div className={styles.text_container}>
                    <span className={styles.title}>Oops!</span>                    
                    <span className={styles.message}>Page is not found!</span>
                </div>
            </div>    
            <button onClick={handleClick}>Go Back</button>        
        </div>
    );
}