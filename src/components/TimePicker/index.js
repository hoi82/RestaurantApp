import React, { useState, useEffect } from 'react';
import styles from "./styles.scss";
import reload from "../../image/reload.svg";
import moment from "moment-timezone";

export default function TimePicker({begin = "", interval = {hour:1, minute: 0}, close = "",
    start="", end="",
    reservedTimes = [], timezone = "America/Havana",
    display={maxWidth: "640px", height: "auto"}, onTimeChange}) {        

    const validatedSetStart = (time) => {
        if (close && reservedTimes.filter((r, i) => {
            const rStart = moment(r.start);
            const rEnd = moment(r.end);
            return rStart.isSameOrBefore(time) && rEnd.isSameOrBefore(end);            
        }).length == 0) {
            onTimeChange(moment(time).format(), end);
        } 
        else if (!close) {
            onTimeChange(moment(time).format(), end);
        } 
        else {
            onTimeChange(null, end);
        }
    }

    const validatedSetEnd = (time) => {
        if (start && reservedTimes.filter((r, i) => {
            const rStart = moment(r.start);
            const rEnd = moment(r.end);
            return rStart.isSameOrAfter(start) && rEnd.isSameOrBefore(time);            
        }).length == 0) {            
            onTimeChange(start, (moment(time).format()));
        } else if (!start) {
            onTimeChange(start, moment(time).format());
        }
        else {            
            onTimeChange(start, null);
        }
    }        

    const fillAllEmpty = () => {
        const arr = [];
        for (let i = 0; i < 25; i++) {            
            arr.push(
                <button type="button" key={i} disabled>{moment({hour: i, minute: 0}).format("HH:mm")}</button>
            )
        }

        return arr;
    }

    const renderTimeTable = () => {
        if (begin == null || close == null) 
            return fillAllEmpty();

        const tables = [];           
        
        const s = moment(begin).set({second: 0, millisecond: 0});
        const e = moment(close).set({second: 0, millisecond: 0});

        for (let i = s.valueOf();
            i <= e.valueOf(); 
            i = i + interval.hour * 3600 * 1000 + interval.minute * 60 * 1000) {                    
            tables.push(moment(i));
        }        

        return tables.map((time, i) => {
            if (reservedTimes.filter((res, j) => {
                return time.isBetween(moment(res.start), moment(res.end), undefined, "[]");                
            }).length > 0) {
                return <button type="button" key={i} disabled>{time.locale(moment.locale()).format("HH:mm")}</button>                
            }
            else {                
                const className = time.isSame(start) ? styles.start : (time.isSame(end) ? styles.end : null);
                timezone ? time.tz(timezone) : null;
                return <button type="button" className={className} key={i} data-value={time.valueOf()} onClick={handleTimeClick}>{time.locale(moment.locale()).format("HH:mm")}</button>
            }            
        });        
    }

    const handleTimeClick = (e) => {
        const selected = moment(Number(e.target.dataset.value));        
        if (!start) {
            if (selected.isSame(end)) {
                onTimeChange(start, null);
            }
            else {
                validatedSetStart(selected);
            }            
        } else {
            if (selected.isSame(start)) {
                onTimeChange(null, end);
            }
            else {
                if (!close) {
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
                        onTimeChange(start, null);
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
        onTimeChange(null, null);
    }    

    return (
        <div className={styles.container} style={{maxWidth: display.maxWidth, height: display.height}}>
            <div className={styles.indicator}>
                <span>{start ? moment(start).tz(timezone).locale(moment.locale()).format("HH:mm") : "--:--"}</span>
                <span> ~ </span>
                <span>{end ? moment(end).tz(timezone).locale(moment.locale()).format("HH:mm") : "--:--"}</span>
                <img onClick={handleReset} src={reload} className={styles.reload}/>
            </div>            
            <div className={styles.time_table}>
                {renderTimeTable()}
            </div>            
        </div>
    );
}