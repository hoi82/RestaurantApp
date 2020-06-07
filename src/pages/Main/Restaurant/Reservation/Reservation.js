import React, { useState, useEffect } from 'react';
import { fetchRestaurantThumbnail, fetchReservationInfo, createReservation } from '../utils';
import { useParams, useHistory } from 'react-router';
import { getFullAddress } from '../../../../utils/getStrings';
import { IMAGE_URL, endpoint } from '../../../../config/url';
import styles from "./Reservation.module.scss";
import DatePicker from "../../../../components/DatePicker";
import TimePicker from "../../../../components/TimePicker";
import DropdownBox from '../../../../components/DropdownBox';
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from "../../../../actions/common/dialog";
import { DialogMode } from '../../../../types/Variables';
import moment from "moment-timezone";
import { registerReservation, updateMember, updateTime, updateMessage } from '../../../../actions/main/reservation';
import { fetchRestaurantIfNeed } from '../../../../actions/main/restaurant/details';

export default function Reservation({}) {
    const restaurant = useSelector((store) => store.main.details);    
    const reservation = useSelector((store) => store.main.reservation);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    const history = useHistory();
    const param = useParams();

    useEffect(() => {        
        dispatch(fetchRestaurantIfNeed(param.id));        
    },[]);

    useEffect(() => {        
        
    }, [date])

    const handleForm = (e) => {
        e.preventDefault();        
    }

    const handleMember = (value) => {
        dispatch(updateMember(value));
    } 
    
    const handleDate = (value) => {
        setDate(value);
    }

    const handleTime = (sTime, eTime) => {         
        if (sTime) {
            const startSplit = sTime.split(":");            
            
            // setStart(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startSplit[0]), parseInt(startSplit[1])));
        }
        else {
            // setStart(null);
        }

        if (eTime) {
            // const endSplit = eTime.split(":");
            // setEnd(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endSplit[0]), parseInt(endSplit[1])));
        }
        else {
            // setEnd(null);
        }
    }

    const handleMessage = (e) => {
        dispatch(updateMessage(e.target.value));
    }

    const handleSubmit = (e) => {                
        if (restaurant.reservation && restaurant.reservation.fee && restaurant.reservation.fee.value) {
            dispatch(showDialog({
                mode: DialogMode.CONFIRM,
                bgimg: false,
                buttons: false,
                content: "The cancellation fee will be paid.\r\nDo you want to continue reservation?",
                onConfirm: requestReservation
            }))
        } 
        else {
            requestReservation();
        }
    } 
    
    const requestReservation = () => {        
        dispatch(registerReservation()).then(() => {
            
        })
    }

    return (
        <div className={styles.reservation}>
            <form className={styles.container} onSubmit={handleForm}>
                <span className={styles.main_title}>Reservation</span>
                <header className={styles.res_profile}>
                    <img src={restaurant.thumbnail? `${IMAGE_URL}/${restaurant.thumbnail}` : null}/>
                    <div>
                        <span className={styles.name}>{restaurant.name}</span>
                        <span className={styles.address}>{getFullAddress(restaurant.address)}</span>
                    </div>
                </header>    
                <div className={styles.info_panel}>                    
                    <span className={styles.content_header}>Date</span>
                    <DatePicker date={date} onChange={handleDate}/>
                    <span className={styles.content_header}>Time</span>
                    {/* <TimePicker startTime={null} intervalTime={null} endTime={null} 
                    reservedTimes={null} onTimeChange={handleTime}/> */}
                    <span className={styles.content_header}>Member</span>
                    <DropdownBox value={reservation.member} onChange={handleMember} items={[1,2,3,4,5,6,7,8]} width="160px"/>
                    <span className={styles.content_header}>Personal Message</span>
                    <textarea value={reservation.message} className={styles.message} onChange={handleMessage}/>
                </div>                            
                {
                    restaurant.reservation ? <div className={styles.cf_panel}>
                        <span className={styles.content_header}>Cancellation Fee</span>
                        <span className={styles.cf_content}>
                            {
                                restaurant.reservation.fee ? 
                                `${restaurant.reservation.fee.currency} ${restaurant.reservation.fee.value}`
                                : "Free"
                            }
                        </span>
                        {
                            restaurant.reservation.fee ? 
                            <React.Fragment>
                                <span className={styles.cf_warning}>No payment is registered.</span>
                                <button className={styles.cf_reg_btn}>Register Payment</button>
                            </React.Fragment>
                            : null
                        }                        
                    </div>
                    : null
                }                
                <button className={styles.submit_btn} onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}