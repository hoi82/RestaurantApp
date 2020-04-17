import React from 'react';
import Profile from './Profile';
import styles from "./Nav.module.scss";
import { Link } from 'react-router-dom';
import { endpoint } from "../../config/url";

export default (props) => {
    return (
        <div className={styles.nav}>
            <Profile/>
            <div className={styles.acco}>
                <div className={styles.acco_item}>
                    <label className={styles.acco_header} htmlFor="cbRes">                        
                        Restaurant
                    </label>                    
                    <input className={styles.acco_idc} type="checkbox" id="cbRes" hidden/>
                    <div className={styles.acco_content}>
                            <Link to="/">
                                <button className={styles.acco_button}>
                                    Top Related
                                </button>
                            </Link>                            
                            <Link to="/">
                                <button className={styles.acco_button}>
                                    Hot!
                                </button>
                            </Link>                        
                        <div className={styles.sub_acco}>
                            <div className={styles.acco_item}>
                                <label className={styles.acco_header} htmlFor="cbSearch">
                                    Search
                                </label>                                
                                <input className={styles.acco_idc} type="checkbox" id="cbSearch" hidden/>
                                <div className={styles.acco_content}>
                                        <Link to={endpoint.searchRestaurantByName}>
                                            <button className={styles.acco_button}>
                                                By Name
                                            </button>
                                        </Link>                                        
                                        <Link to={endpoint.searchRestaurantByCategory}>
                                            <button className={styles.acco_button}>
                                                By Category
                                            </button>
                                        </Link>                                        
                                        <Link to={endpoint.searchRestaurantByLocation}>
                                            <button className={styles.acco_button}>
                                                By Location
                                            </button>
                                        </Link>
                                </div>
                            </div>
                        </div>
                            <Link to="/">
                                <button className={styles.acco_button}>
                                    My Reservation
                                </button>
                            </Link>                                            
                    </div>
                </div>
                <div className={styles.acco_item}>
                    <label htmlFor="cbFood" className={styles.acco_header} htmlFor="cbFood">
                        Food
                    </label>   
                    <input className={styles.acco_idc} type="checkbox" id="cbFood" hidden/>
                    <div className={styles.acco_content}>
                        <button className={styles.acco_button}>
                            Search
                        </button>                        
                    </div>
                </div>
                <div className={styles.acco_item}>
                    <label className={styles.acco_header} htmlFor="cbReceipt">
                        Receipt
                    </label>
                    <input className={styles.acco_idc} type="checkbox" id="cbReceipt" hidden/>
                    <div className={styles.acco_content}>
                        <button className={styles.acco_button}>
                            Show
                        </button>
                        <button className={styles.acco_button}>
                            Manage
                        </button>
                    </div>
                </div>
            </div>            
        </div>
    );
}