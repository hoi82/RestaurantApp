import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFullAddress } from '../../../../utils/getStrings';
import { IMAGE_URL } from '../../../../config/url';
import styles from "./Reservation.module.scss";
import DatePicker from "../../../../components/DatePicker";
import TimePicker from "../../../../components/TimePicker";
import DropdownBox from '../../../../components/DropdownBox';
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from "../../../../actions/common/dialog";
import { DialogMode } from '../../../../types/Variables';
import moment from "moment-timezone";
import { registerReservation, updateMember, updateTime, updateMessage } from '../../../../actions/main/reservation';
import { fetchRestaurantIfNeed, LOADED_RESTAURANT } from '../../../../actions/main/restaurant/details';
import { fetchReservationInfo } from '../utils';
import noImage from '../../../../types/noImage';

export default function Reservation({}) {
    const restaurant = useSelector((store) => store.main.restaurant.details);    
    const reservation = useSelector((store) => store.main.reservation);
    const [calculatedReserves, setCalculatedReserves] = useState([]);
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();    
    const param = useParams();    

    useEffect(() => {        
        dispatch(fetchRestaurantIfNeed(param.id));        
    },[]);    

    useEffect(() => {                        
        fetchReservationInfo(param.id, date).then((res) => {            
            setCalculatedReserves(calculateReserved(res));
        });
          
    }, [restaurant.status == LOADED_RESTAURANT && date]);    

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
        } 
        else {
            requestReservation();
        }
    } 
    
    const requestReservation = () => {        
        dispatch(registerReservation());        
    }    

    const getDateMoment = () => {
        return restaurant.opens.timezone ? moment.tz(date, restaurant.opens.timezone) : moment(date);
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
        return restaurant.opens.time[time.weekday()].slice().sort((a, b) => {            
            return Number(a.open.hour) - Number(b.open.hour) != 0 ? Number(a.open.hour) - Number(b.open.hour) : Number(a.open.minute) - Number(b.open.mminute);
        }) || [];
    }

    const calculateReserved = (reservations = []) => {        
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
            const open = moment.tz(restaurant.opens.timezone).set({
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate()
            }).set(schedule[0].open).set({
                second: 0, 
                millisecond: 0
            });
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
        <form className={styles.reservation} onSubmit={handleForm}>
            <span className={styles.main_title}>Reservation</span>
            <header className={styles.res_profile}>
                <img src={restaurant.thumbnail? `${IMAGE_URL}/${restaurant.thumbnail}` : noImage}/>
                <div>
                    <span className={styles.name}>{restaurant.name}</span>
                    <span className={styles.address}>{getFullAddress(restaurant.address)}</span>
                </div>
            </header>    
            <div className={styles.info_panel}>                    
                <span className={styles.content_header}>Date</span>
                <DatePicker date={date} onChange={handleDate}/>
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
    );
}