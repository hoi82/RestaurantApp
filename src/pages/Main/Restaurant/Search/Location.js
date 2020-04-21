import React from 'react';
import styles from "./styles.scss";

export default (props) => {
    return (
        <div className={styles.container}>
            <span className={styles.title}>Search By Location</span>
            <span className={styles.description}>Select the location whay you want.</span>            
        </div>
    );
}