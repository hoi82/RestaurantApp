import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { getFullAddress } from '../../../../utils/getStrings';
import { IMAGE_URL, endpoint } from '../../../../config/url';
import styles from "./Reservation.module.scss";
import DatePicker from "../../../../components/DatePicker";
import TimePicker from "../../../../components/TimePicker";
import DropdownBox from '../../../../components/DropdownBox';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { showDialog } from "../../../../actions/common/dialog";
import { DialogMode } from '../../../../types/Variables';
import moment from "moment-timezone";
import { registerReservation, updateMember, updateTime, updateMessage, fetchReservationIfNeed, RESERVATION_COMPLETE, fetchReservation } from '../../../../actions/main/reservation';
import { fetchRestaurantIfNeed } from '../../../../actions/main/restaurant/details';

export default function Reservation({}) {
    const restaurant = useSelector((store) => store.main.restaurant.details);    
    const reservation = useSelector((store) => store.main.reservation);
    const [calculatedReserves, setCalculatedReserves] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const param = useParams();

    useEffect(() => {        
        dispatch(fetchRestaurantIfNeed(param.id));
        dispatch(fetchReservation(param.id, reservation.date));        
    },[]);

    useEffect(() => {
        console.log("changed\r\n:", reservation);
        setCalculatedReserves(calculateReserved());
    }, [reservation]);    

    const handleForm = (e) => {
        e.preventDefault();        
    }

    const handleMember = (value) => {
        dispatch(updateMember(value));
    } 
    
    const handleDate = (value) => {                
        dispatch(updateTime({start: null, end: null}));
        dispatch(fetchReservationIfNeed(param.id, value));        
    }

    const handleTime = (sTime, eTime) => {        
        dispatch(updateTime({start: sTime, end: eTime}));          
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
            // requestReservation();
        } 
        else {
            requestReservation();
        }
    } 
    
    const requestReservation = () => {        
        dispatch(registerReservation((state, payload) => {  
            if (state == RESERVATION_COMPLETE) {
                history.push(`${endpoint.restaurantReservationResult}/${payload}`);
            }
        }));        
    }    

    const getDateMoment = () => {
        return restaurant.opens.timezone ? moment.tz(reservation.date, restaurant.opens.timezone) : moment(reservation.date);
    }

    const getOpenTime = () => {        
        const time = getDateMoment();
        const schedule = getRestaurantSchedule();
        if (schedule.length > 0) {
            return time.set({hour: schedule[0].open.hour, minute: schedule[0].open.minute, second: 0, millisecond: 0}).format();            
        }
        else {
            return null;
        }
    }

    const getCloseTime = () => {
        const time = getDateMoment();        
        const schedule = getRestaurantSchedule();
        if (schedule.length > 0) {
            return time.set({hour: schedule[schedule.length - 1].close.hour, minute: schedule[schedule.length - 1].close.minute, second: 0, millisecond: 0}).format();            
        }
        else {
            return null;
        }
    }

    const getRestaurantSchedule = () => {
        const time = getDateMoment();
        return restaurant.opens.time[time.weekday()].sort((a, b) => {
            return Number(a.open.hour) - Number(b.open.hour) != 0 ? Number(a.open.hour) - Number(b.open.hour) : Number(a.open.minute) - Number(b.open.mminute);
        }) || [];
    }

    const calculateReserved = () => {
        const reservations = reservation.reserved;
        const schedule = getRestaurantSchedule();        
        
        const result = [];        

        //Fill with Reservations
        reservations.forEach((reservation) => {
            result.push({
                start: moment(reservation.start).format(), 
                end: moment(reservation.end).format()
            });
        });                

        //Fill with Restaurant's Rest Time
        for (let i = 1; i < schedule.length; i++) {            
            result.push({
                start: getDateMoment().set({
                    hour: schedule[i-1].close.hour, minute: schedule[i-1].close.minute, second: 0, millisecond: 0
                }).format(),
                end: getDateMoment().set({
                    hour: schedule[i].open.hour, minute: schedule[i].open.minute, second:0, millisecond: 0
                }).format()
            })
        };
        
        //Fill with the gap between Current Time and Restaurant Open
        if (schedule.length > 0) {            
            const now = moment();
            const open = moment.tz(restaurant.opens.timezone).set(schedule[0].open).set({second: 0, millisecond: 0});
            if (open.isBefore(now)) {
                result.push({
                    start: open.format(),
                    end: now.format()
                })
            }
        }

        return result;
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
                    <DatePicker date={reservation.date} onChange={handleDate}/>
                    <span className={styles.content_header}>Time</span>
                    <TimePicker begin={getOpenTime()} close={getCloseTime()} start={reservation.start} end={reservation.end}
                    reservedTimes={calculatedReserves} timezone={restaurant.opens.timezone} onTimeChange={handleTime}/>
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