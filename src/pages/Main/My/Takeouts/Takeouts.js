import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { LOG_IN_SUCCESS, SESSION_FOUND } from '../../../../actions/auth';
import styles from "./Takeouts.module.scss";
import { IMAGE_URL } from '../../../../config/url';
import noImage from '../../../../types/noImage';
import { fetchRestaurantThumbnail } from '../../Restaurant/utils';
import { getFullAddress } from '../../../../utils/getStrings';

function Takeout({resid, orders, totalprice}) {
    const [restaurantInfo, setRestaurantInfo] = useState({});

    useEffect(() => {
        fetchRestaurantThumbnail(resid).then((res) => {
            setRestaurantInfo(res);            
        });
    }, []);    

    const getMenuStringFromOrders = (orders) => {
        return orders.map((item) => (
            `${item.name} x ${item.quantity}`
        )).join(", ");
    }

    return (
        <div className={styles.takeout}>
            <img className={styles.thumb} src={restaurantInfo.thumbnail ? `${IMAGE_URL}/${restaurantInfo.thumbnail}` : noImage}/>
            <div className={styles.text_container}>
                <span className={styles.title}>{restaurantInfo.name}</span>
                <span className={styles.small_content}>{getFullAddress(restaurantInfo.address)}</span>
                <span className={styles.small_content}>{getMenuStringFromOrders(orders)}</span>
                <span className={styles.big_content}>{totalprice}</span>
            </div>            
        </div>
    )
}

function Takeouts(props) {
    const [takeouts, setTakeouts] = useState([]);
    const auth = useSelector((store) => store.auth);

    useEffect(() => {        
        if (auth.isLogin) {                        
            axios.get(`http://localhost:3005/api/takeouts/${auth.id}`).then((res) => {                
                setTakeouts(res.data);
            })
        }
    }, [auth]);    

    const renderTakeouts = (takeouts) => {
        return takeouts.map((takeout) => (
            <Takeout key={takeout.id} {...takeout}/>
        ))
    }

    return (
        <div className={styles.takeouts}>
            <span className={styles.main_title}>Takeouts</span>
            <div className={styles.takeout_grid}>
                {renderTakeouts(takeouts)}
            </div>            
        </div>
    );
}

export default Takeouts;