import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getFullAddress } from '../../../../utils/getStrings';
import styles from "./ReservationResult.module.scss";
import { endpoint } from '../../../../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservationResult } from '../../../../actions/main/reservationResult';

export default function ReservationResult({}) {
    const reservation = useSelector((store) => store.main.reservationResult);
    const histroy = useHistory();
    const param = useParams();       
    const dispatch = useDispatch();

    useEffect(() => {                
        dispatch(fetchReservationResult(param.id));
    },[]);    

    const handleExit = (e) => {
        histroy.replace(`${endpoint.restaurantDetail.replace(":id", reservation.restaurantID)}`);
    }
    
    return (
        <div className={styles.result}>            
            <div className={styles.content_box}>
                <span className={styles.main_title}>Reservation Completed!</span>
            </div>            
            <div className={styles.content_box}>
                <span className={styles.title}>Restaurant</span>
                <span className={styles.res_name}>{reservation.restaurantName}</span>
                <span className={styles.res_address}>{getFullAddress(reservation.restaurantAddress)}</span>
            </div>
            <div className={styles.content_box}>
                <span className={styles.title}>Reservation Info</span>
                <span className={styles.sub_title}>Name</span>
                <span className={styles.content}>{reservation.reservationName}</span>
                <span className={styles.sub_title}>Time</span>
                <span className={styles.content}>{`${new Date(reservation.time).toLocaleString()}`}</span>
                <span className={styles.sub_title}>Member</span>
                <span className={styles.content}>{reservation.member}</span>
                <span className={styles.sub_title}>Message</span>
                <p className={styles.message}>{reservation.message ? reservation.message : "None"}</p>
            </div>  
            <div className={styles.button_panel}>
                <button className={styles.menu_btn}>Share with SNS</button>
                <button className={styles.menu_btn} onClick={handleExit}>Back to Restaurant</button>
            </div>            
        </div>        
    );
}