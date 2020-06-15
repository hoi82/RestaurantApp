import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { fetchReservation } from '../utils';
import { getFullAddress } from '../../../../utils/getStrings';
import styles from "./ReservationResult.module.scss";
import { endpoint } from '../../../../config/url';

export default function ReservationResult({}) {    
    const histroy = useHistory();
    const param = useParams();
    const [resInfo, setResInfo] = useState({});    

    useEffect(() => {        
        fetchReservation(param.id).then((reservation) => {                        
            setResInfo(reservation);            
        }).catch((err) => {
            console.log(err);
        })
    },[]);    

    const handleExit = (e) => {
        histroy.replace(`${endpoint.restaurantDetail.replace(":id", restaurantThumbnail.id)}`);
    }
    
    return (
        <div className={styles.result}>            
            <div className={styles.content_box}>
                <span className={styles.main_title}>Reservation Completed!</span>
            </div>            
            <div className={styles.content_box}>
                <span className={styles.title}>Restaurant</span>
                <span className={styles.res_name}>{resInfo.resname}</span>
                <span className={styles.content}>{getFullAddress(resInfo.resaddress)}</span>
            </div>
            <div className={styles.content_box}>
                <span className={styles.title}>Reservation Info</span>
                <span className={styles.sub_title}>Name</span>
                <span className={styles.content}>John Doe</span>
                <span className={styles.sub_title}>Time</span>
                <span className={styles.content}>{`${new Date(resInfo.start).toLocaleString()} ~ ${new Date(resInfo.end).toLocaleString()}`}</span>
                <span className={styles.sub_title}>Member</span>
                <span className={styles.content}>{resInfo.member}</span>
                <span className={styles.sub_title}>Message</span>
                <p className={styles.content}>{resInfo.message}</p>
            </div>  
            <div>
                <button className={styles.menu_btn}>Share with SNS</button>
                <button className={styles.menu_btn} onClick={handleExit}>Back to Restaurant</button>
            </div>            
        </div>        
    );
}