import React, { useState, useEffect } from 'react';
import styles from "./styles.scss";
import reload from "../../image/reload.svg";
import moment from "moment-timezone";

export default function TimePicker({startTime = {hour: 0, minute: 0}, intervalTime = {hour:1, minute: 0}, endTime = {hour: 24, minute: 0}, 
    reservedTimes = [], timezone = "America/Havana", date= {year: 2010, month: 1, date: 1},
    display={maxWidth: "640px", height: "auto"}, onTimeChange}) {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);    

    useEffect(() => {
        if (typeof onTimeChange == "function")
            onTimeChange(start, end);
        console.log("start", start);
        console.log("end", end);
    }, [start, end]);    

    const validatedSetStart = (time) => {
        if (end && reservedTimes.filter((r, i) => {
            const rStart = moment(r.start);
            const rEnd = moment(r.end);
            return rStart.isSameOrBefore(time) && rEnd.isSameOrBefore(end);            
        }).length == 0) {
            setStart(moment(time).format());
        } 
        else if (!end) {
            setStart(moment(time).format());
        } 
        else {
            setStart(null);
        }
    }

    const validatedSetEnd = (time) => {
        if (start && reservedTimes.filter((r, i) => {
            const rStart = moment(r.start);
            const rEnd = moment(r.end);
            return rStart.isSameOrAfter(start) && rEnd.isSameOrBefore(time);            
        }).length == 0) {            
            setEnd(moment(time).format());
        } else if (!start) {
            setEnd(moment(time).format());
        }
        else {            
            setEnd(null);
        }
    }        

    const renderTimeTable = () => {        
        const tables = [];           
        
        const s = moment.tz(timezone).set({year: date.year, month: date.month - 1, date: date.date}).set(startTime).set({second: 0, millisecond: 0});
        const e = moment.tz(timezone).set({year: date.year, month: date.month - 1, date: date.date}).set(endTime).set({second: 0, millisecond: 0});

        for (let i = s.valueOf();
            i <= e.valueOf(); 
            i = i + intervalTime.hour * 3600 * 1000 + intervalTime.minute * 60 * 1000) {                    
            tables.push(moment(i));
        }        

        return tables.map((time, i) => {
            if (reservedTimes.filter((res, j) => {
                return time.isSameOrAfter(moment(res.start))
                    && time.isSameOrBefore(moment(res.end))                
            }).length > 0) {
                return <button key={i} disabled>{time.locale(moment.locale()).format("HH:mm")}</button>                
            }
            else {
                const className = time.isSame(start) ? styles.start : (time.isSame(end) ? styles.end : null);                
                return <button className={className} key={i} data-value={time.valueOf()} onClick={handleTimeClick}>{time.tz(timezone).locale(moment.locale()).format("HH:mm")}</button>
            }            
        });        
    }

    const handleTimeClick = (e) => {
        const selected = moment(Number(e.target.dataset.value));        
        if (!start) {
            if (selected.isSame(end)) {
                setEnd(null);
            }
            else {
                validatedSetStart(selected);
            }            
        } else {
            if (selected.isSame(start)) {
                setStart(null);
            }
            else {
                if (!end) {
                    if (selected.isBefore(start)) {
                        validatedSetEnd(start);
                        validatedSetStart(selected);
                    } 
                    else {
                        validatedSetEnd(selected);
                    }                    
                } 
                else {
                    if (selected.isSame(end)) {
                        setEnd(null);
                    }
                    else {                        
                        if (selected.isBefore(start)) {
                            validatedSetEnd(start);
                            validatedSetStart(selected);
                        } 
                        else {
                            validatedSetEnd(selected);
                        }
                    }
                }
            }            
        }
    }

    const handleReset = () => {
        setStart(null);
        setEnd(null);
    }

    return (
        <div className={styles.container} style={{maxWidth: display.maxWidth, height: display.height}}>
            <div className={styles.indicator}>
                <span>{start ? moment.tz(start, timezone).locale(moment.locale()).format("HH:mm") : "--:--"}</span>
                <span> ~ </span>
                <span>{end ? moment.tz(end, timezone).locale(moment.locale()).format("HH:mm") : "--:--"}</span>
                <img onClick={handleReset} src={reload} className={styles.reload}/>
            </div>            
            <div className={styles.time_table}>
                {renderTimeTable()}
            </div>            
        </div>
    );
}