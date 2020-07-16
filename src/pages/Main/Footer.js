import React from 'react';
import styles from "./Footer.module.scss";
import { Link } from 'react-router-dom';
import { endpoint } from '../../config/url';

function Footer(props) {
    return (
        <div className={styles.footer}>
            <div className={styles.menus}>
                <h3>Quick Links</h3>
                <ul>
                    <li>
                        <Link to={endpoint.searchRestaurantByName}>Search by restaurant name</Link>
                    </li>
                    <li>
                        <Link to={endpoint.searchRestaurantByCategory}>Search by restaurant categories</Link>
                    </li>
                    <li>
                        <Link to={endpoint.searchRestaurantByLocation}>Search by restaurant address</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.menus}>
                <h3>My Restaurant</h3>
                <ul>
                    <li>
                        <Link to={endpoint.home}>About us</Link>
                    </li>
                    <li>
                        <Link to={endpoint.home}>Contact us</Link>
                    </li>
                    <li>
                        <Link to={endpoint.home}>Terms of use</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;