import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { LOG_IN_SUCCESS, SESSION_FOUND } from '../../../../actions/auth';
import moment from "moment-timezone";
import { fetchRestaurantThumbnail, cancelFetch } from '../../Restaurant/utils';
import { getFullAddress } from '../../../../utils/getStrings';
import styles from "./Reservations.module.scss";
import { IMAGE_URL } from '../../../../config/url';
import noImage from '../../../../types/noImage';

function Reservation({start, end, timezone, member, resid}) {
    const [restaurantInfo, setRestaurantInfo] = useState({});

    useEffect(() => {
        fetchRestaurantThumbnail(resid).then((res) => {
            setRestaurantInfo(res);            
        });

        return () => cancelFetch();
    }, []);
    
    return (
        <div className={styles.reservation}>
            <img className={styles.thumb} src={restaurantInfo.thumbnail ? `${IMAGE_URL}/${restaurantInfo.thumbnail}` : noImage}/>
            <div className={styles.text_container}>                
                <span className={styles.title}>{restaurantInfo.name}</span>
                <span className={styles.small_content}>{getFullAddress(restaurantInfo.address)}</span>                                
                <span className={styles.big_content}>{`${moment.tz(start, timezone).locale("ko-KR").format("llll")} ~ ${moment.tz(end, timezone).format("LT")}`}</span>            
                <span className={styles.small_content}>{`${member}명`}</span>                
            </div>            
        </div>
    )
}

function Reservations(props) {
    const [reservations, setReservations] = useState([]);
    const auth = useSelector((store) => store.auth);

    useEffect(() => {           
        if (auth.isLogin) {                                                
            axios.get(`http://localhost:3005/api/reservations/${auth.id}`).then((res) => {
                setReservations(res.data);
            })
        }
    }, [auth]);    

    const renderReservations = (reservations) => {        
        return reservations.map((reservation) => (
            <Reservation key={reservation.id} {...reservation}/>
        ))
    }

    return (
        <div className={styles.reservations}>
            <span className={styles.main_title}>Reservations</span>
            <div className={styles.reservation_grid}>
                {renderReservations(reservations)}
            </div>   
            <img/>         
        </div>
    );
}

export default Reservations;