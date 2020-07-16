import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment-timezone";
import { getFullAddress } from '../../../../utils/getStrings';
import styles from "./Reservations.module.scss";
import { IMAGE_URL, endpoint } from '../../../../config/url';
import noImage from '../../../../types/noImage';
import { fetchMyReservations } from '../../../../actions/main/myReservation';
import MenuButton from '../../../../components/MenuButton/MenuButton';
import Popup from '../../../../components/Popup';
import { Link } from 'react-router-dom';
import { showDialog } from '../../../../actions/common/dialog';

function Reservation({restaurantThumbnail, restaurantAddress, restaurantName, start, end, timezone, member}) {
    const btnRef = useRef();
    const dispatch = useDispatch();

    const handleDetails = (e) => {
        dispatch(showDialog({
            bgimg: false,
            buttons: true,
            content: "bbb"
        }))
    }

    return (
        <div className={styles.reservation}>
            <img className={styles.thumb} src={restaurantThumbnail ? `${IMAGE_URL}/${restaurantThumbnail}` : noImage}/>
            <div className={styles.text_container}>                
                <span className={styles.title}>{restaurantName}</span>
                <span className={styles.small_content}>{getFullAddress(restaurantAddress)}</span>                                
                <span className={styles.big_content}>{`${moment.tz(start, timezone).locale("ko-KR").format("llll")} ~ ${moment.tz(end, timezone).format("LT")}`}</span>            
                <span className={styles.small_content}>{`${member}명`}</span>     
            </div>     
            <MenuButton className={styles.menu} ref={btnRef}/>
            <Popup trigger={btnRef} position={{right: "0", top: "40px"}}>
                <div className={styles.menu_panel}>                    
                    <button onClick={handleDetails} data-closebutton={true}>Details</button>
                    <Link to={`${endpoint.home}`}>Edit</Link>
                    <Link to={`${endpoint.takeout}`}>Cancel Reservation</Link>
                </div>
            </Popup>
        </div>
    )
}

function Reservations(props) {    
    const my = useSelector((store) => store.main.my.reservation);
    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {                   
        if (auth.isLogin) {
            dispatch(fetchMyReservations(auth.id));
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
                {renderReservations(my.reservations)}
            </div>   
            <img/>         
        </div>
    );
}

export default Reservations;