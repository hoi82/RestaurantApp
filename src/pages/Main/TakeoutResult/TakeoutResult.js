import React, { useState, useEffect } from 'react';
import Popup from "../../../components/Popup";
import styles from "./TakeoutResult.module.scss";
import axios from "axios";
import { useParams } from 'react-router';
import { getFullAddress } from "../../../utils/getStrings";

function TakeoutResult(props) {
    const [takeout, setTakeout] = useState(null);
    const param = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3005/api/takeout/${param.id}`).then((res) => {
            setTakeout(res.data);            
        });        
    }, []);

    const renderOrders = (orders) => {
        return orders.map((order, i) => (
            <div className={styles.order} key={order.menuid}>
                <span className={styles.name}>{order.name}</span>
                <span className={styles.quantity}>{order.quantity}</span>                
                <span className={styles.price}>{order.menutotalprice}</span>                
            </div>
        ))
    }

    return (
        <div className={styles.takeout_result}>
            <div className={styles.title_box}>
                <span className={styles.page_title}>Order completed</span>
                <svg id="btnMenu" className={styles.menu} enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m257.36 337.61c-33.084 0-60 26.916-60 60s26.916 60 60 60 60-26.916 60-60-26.916-60-60-60zm0 100c-22.057 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"/>
                    <path d="m257.36 197.61c-33.084 0-60 26.916-60 60s26.916 60 60 60 60-26.916 60-60-26.916-60-60-60zm0 100c-22.057 0-40-17.943-40-40 0-22.056 17.944-40 40-40s40 17.944 40 40c0 22.057-17.944 40-40 40z"/>
                    <path d="m257.36 177.61c33.084 0 60-26.916 60-60s-26.916-60-60-60-60 26.916-60 60 26.916 60 60 60zm0-100c22.056 0 40 17.944 40 40 0 22.057-17.944 40-40 40-22.057 0-40-17.943-40-40 0-22.055 17.944-40 40-40z"/>
                </svg>
                <Popup triggerID="btnMenu" position={{top: "48px", right: 0}}>
                    <div className={styles.menu_panel}>
                        <button>Save to receipts</button>
                        <button>Share</button>
                        <button>Back to Takeout</button>
                        <button>Back to Restaurant</button>
                    </div>
                </Popup>
            </div>   
            <div className={styles.content_box}>
                <span className={styles.section_title}>Name</span>
                <span className={styles.large_content}>{takeout ? takeout.username : null}</span>
            </div>
            <div className={styles.content_box}>
                <span className={styles.section_title}>Restaurant</span>
                <span className={styles.large_content}>{takeout ? takeout.restaurantname : null}</span>
                <span className={styles.small_content}>{takeout ? getFullAddress(takeout.restaurantaddress) : null}</span>
            </div>
            <div className={styles.content_box}>
                <span className={styles.section_title}>Orders</span>
                <div className={styles.orders}>                    
                    {takeout ? renderOrders(takeout.orders) : null}
                </div>
                <span className={styles.total_price}>{takeout ? `Total : ${takeout.totalprice}` : null}</span>
            </div>            
        </div>
    );
}

export default TakeoutResult;