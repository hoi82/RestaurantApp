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
                    <input className={styles.acco_idc} type="checkbox" id="cbRes" hidden defaultChecked={true}/>
                    <div className={styles.acco_content}>
                        <Link className={styles.acco_button} to="/">                                
                            Top Related                                
                        </Link>                            
                        <Link className={styles.acco_button} to="/">                                
                            Hot!                                
                        </Link>  
                        <Link className={styles.acco_button} to={endpoint.favoriteRestaurants}>
                            Favorites
                        </Link>                                              
                    </div>                    
                </div>    
                <div className={styles.acco_item}>
                    <label className={styles.acco_header} htmlFor="cbResSearch">
                        Search
                    </label>
                    <input className={styles.acco_idc} type="checkbox" id="cbResSearch" hidden/>
                    <div className={styles.acco_content}>
                        <Link className={styles.acco_button} to={endpoint.searchRestaurantByName}>
                            By Name
                        </Link>
                        <Link className={styles.acco_button} to={endpoint.searchRestaurantByCategory}>
                            By Category
                        </Link>
                        <Link className={styles.acco_button} to={endpoint.searchRestaurantByLocation}>
                            By Location
                        </Link>
                    </div>
                </div>     
                {/* <div className={styles.acco_item}>
                    <label className={styles.acco_header} htmlFor="cbFood">                        
                        Food
                    </label>                    
                    <input className={styles.acco_idc} type="checkbox" id="cbFood" hidden defaultChecked={true}/>
                    <div className={styles.acco_content}>
                        <Link className={styles.acco_button} to="/">                                
                            Top Related                                
                        </Link>                            
                        <Link className={styles.acco_button} to="/">                                
                            Hot!                                
                        </Link>  
                        <Link className={styles.acco_button} to={endpoint.favoriteRestaurants}>
                            Favorites
                        </Link>                                              
                    </div>
                    <div className={styles.sub_acco}>
                        <div className={styles.acco_item}>
                            <label className={styles.acco_header} htmlFor="cbFoodSearch">
                                Search
                            </label>
                            <input className={styles.acco_idc} type="checkbox" id="cbFoodSearch" hidden/>
                            <div className={styles.acco_content}>
                                <Link className={styles.acco_button} to={endpoint.searchRestaurantByName}>
                                    By Name
                                </Link>
                                <Link className={styles.acco_button} to={endpoint.searchRestaurantByCategory}>
                                    By Category
                                </Link>
                                <Link className={styles.acco_button} to={endpoint.searchRestaurantByLocation}>
                                    By Location
                                </Link>
                            </div>
                        </div>   
                    </div>                    
                </div>             */}
                <div className={styles.acco_item}>
                    <label className={styles.acco_header} htmlFor="cbReserve">
                        My Reservations
                    </label>
                    <input className={styles.acco_idc} type="checkbox" id="cbReserve" hidden/>
                    <div className={styles.acco_content}>
                        <Link className={styles.acco_button} to={""}>
                            Restaurants
                        </Link>
                        <Link className={styles.acco_button} to={""}>
                            Takeouts
                        </Link>
                        {/* <Link className={styles.acco_button} to={""}>
                            Menu Orders
                        </Link> */}
                    </div>
                </div>             
                <div className={styles.acco_item}>
                    <label className={styles.acco_header} htmlFor="cbReceipt">
                        Receipt
                    </label>
                    <input className={styles.acco_idc} type="checkbox" id="cbReceipt" hidden/>
                    <div className={styles.acco_content}>
                        <Link className={styles.acco_button} to={endpoint.home}>                            
                            Show                            
                        </Link>      
                        <Link className={styles.acco_button} to={endpoint.home}>                            
                            Manage                            
                        </Link>                                          
                    </div>
                </div>
            </div>            
        </div>
    );
}