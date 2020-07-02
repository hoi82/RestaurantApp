import React, { useState, useRef } from 'react';
import styles from "./style.scss";
import Popup from '../Popup';
import Calendar from 'react-calendar';
import moment from "moment";

function DatePicker({date, onChange}) {        
    const btnRef = useRef();

    const isSame = (date1 = new Date(), date2 = new Date()) => {
        return (date1.getFullYear() == date2.getFullYear()) && (date1.getMonth() == date2.getMonth()) && (date1.getDate() == date2.getDate());
    }
    
    const handleDateChange = (value) => {  
        if (!isSame(value, date)) {
            onChange(value);        
        }

        btnRef.current.click();
        
    }    

    return (
        <div className={styles.datepicker}>
            <button type="button" ref={btnRef} className={styles.date_button}>
                <div>
                    <span>{date ? date.toLocaleDateString() : null}</span>
                </div>
            </button>
            <Popup trigger={btnRef} position={{top: "48px"}}>
                <Calendar value={date} next2Label={<div>v</div>} minDetail={"year"} minDate={new Date()} className={styles.calendar} onChange={handleDateChange}/>
            </Popup>
        </div>
    );
}

export default DatePicker;