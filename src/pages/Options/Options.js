import React from 'react';
import styles from "./Options.module.scss";

function Options(props) {
    return (
        <div className={styles.options}>
            <div className={styles.nav_panel}>
                nav
            </div>
            <div className={styles.content_panel}>
                content
            </div>
        </div>
    );
}

export default Options;