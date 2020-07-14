import React from 'react';
import styles from "./Footer.module.scss";

function Footer(props) {
    return (
        <div className={styles.footer}>
            <header>Quick Links</header>
            <ul title="Quick Links">
                <li>Search by restaurant name</li>
                <li>Search by restaurant categories</li>
                <li>Search by restaurant address</li>
            </ul>
        </div>
    );
}

export default Footer;