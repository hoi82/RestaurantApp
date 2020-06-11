import React, { useState, useRef } from 'react';
import styles from "./style.scss";
import Popup from '../Popup';
import Calendar from 'react-calendar';
import moment from "moment";

function DatePicker({date, onChange}) {    
    const [btnID, setBtnID] = useState(`datepic${new Date().getTime()}`);    
    const btnRef = useRef();
    
    const handleDateChange = (value) => {        
        onChange(value);
        btnRef.current.click();
    }    

    return (
        <div className={styles.datepicker}>
            <button id={btnID} ref={btnRef} className={styles.date_button}>
                <div>
                    <span>{date ? date.toLocaleDateString() : null}</span>
                </div>
            </button>
            <Popup triggerID={btnID} position={{top: "48px"}}>
                <Calendar value={date} next2Label={<div>v</div>} minDetail={"year"} minDate={new Date()} className={styles.calendar} onChange={handleDateChange}/>
            </Popup>
        </div>
    );
}

export default DatePicker;