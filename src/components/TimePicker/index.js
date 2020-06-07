import React, { useState, useEffect } from 'react';
import styles from "./styles.scss";
import reload from "../../image/reload.svg";

export default function TimePicker({startTime = "0:00", intervalTime = "1:00", endTime = "24:00", reservedTimes = [], display={maxWidth: "640px", height: "auto"}, onTimeChange}) {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [reservedTimesStr, setReservedTimeStr] = useState([]);

    useEffect(() => {        
        setReservedTimeStr(reservedTimes.map((res, i) => {            
            if (res.start.split(":").length != 2) {
                const sDate = new Date(res.start);
                const sEnd = new Date(res.end);
                return {
                    start: `${sDate.getHours()}:${sDate.getMinutes()}`,
                    end: `${sEnd.getHours()}:${sEnd.getMinutes()}`
                }
            } 
            else {                
                return res;
            }
        }));
    },[reservedTimes]);

    useEffect(() => {
        if (typeof onTimeChange == "function")
            onTimeChange(start, end);
    }, [start, end]);

    const validatedSetStart = (time) => {
        if (end && reservedTimesStr.filter((r, i) => {
            return (timeStrToMilliSecond(r.start) <= timeStrToMilliSecond(time)) && (timeStrToMilliSecond(r.end) <= timeStrToMilliSecond(end));
        }).length == 0) {
            setStart(time);
        } 
        else if (!end) {
            setStart(time);
        } 
        else {
            setStart(null);
        }
    }

    const validatedSetEnd = (time) => {
        if (start && reservedTimesStr.filter((r, i) => {
            return (timeStrToMilliSecond(r.start) >= timeStrToMilliSecond(start)) && (timeStrToMilliSecond(r.end) <= timeStrToMilliSecond(time));
        }).length == 0) {            
            setEnd(time);
        } else if (!start) {
            setEnd(time);
        }
        else {            
            setEnd(null);
        }
    }

    const timeStrToTime = (time = "0:00") => {
        const split = time.split(":");
        return new Date(1970, 1, 1, split[0], split[1]);
    }

    const timeStrToMilliSecond = (time = "0:00") => {
        const split = time.split(":");
        return parseInt(split[0]) * 1000 * 60 * 60 + parseInt(split[1]) * 1000 * 60;
    }

    const intToTimeStr = (time) => {
        const t = new Date(time);
        return `${t.getHours() < 10 ? "0" + t.getHours() : t.getHours()}:${t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()}`;
    }

    const renderTimeTable = () => {        
        const tables = [];

        const sTime = timeStrToTime(startTime);
        const interval = timeStrToMilliSecond(intervalTime);
        const eTime = timeStrToTime(endTime);

        for (let i = sTime.getTime(); i <= eTime.getTime() ; i = i + interval) {            
            tables.push(intToTimeStr(i));
        }                

        return tables.map((time, i) => {
            if (reservedTimesStr.filter((res, j) => {
                        return (timeStrToMilliSecond(time) >= timeStrToMilliSecond(res.start)) 
                            && (timeStrToMilliSecond(time) <= timeStrToMilliSecond(res.end))
                    }).length == 0) {                
                const className = time == start ? styles.start : (time == end ? styles.end : null);                
                return <button className={className} key={i} onClick={handleTimeClick}>{time}</button>
            }
            else {
                return <button key={i} disabled={true}>{time}</button>
            }
        })            
    }

    const handleTimeClick = (e) => {
        const selected = e.target.textContent;
        if (!start) {
            if (selected == end) {
                setEnd(null);
            }
            else {
                validatedSetStart(selected);
            }            
        } else {
            if (selected == start) {
                setStart(null);
            }
            else {
                if (!end) {
                    if (timeStrToMilliSecond(selected) < timeStrToMilliSecond(start)) {
                        validatedSetEnd(start);
                        validatedSetStart(selected);
                    } 
                    else {
                        validatedSetEnd(selected);
                    }                    
                } 
                else {
                    if (selected == end) {
                        setEnd(null);
                    }
                    else {                        
                        if (timeStrToMilliSecond(selected) < timeStrToMilliSecond(start)) {
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
                <span>{start ? start : "--:--"}</span>
                <span> ~ </span>
                <span>{end ? end : "--:--"}</span>
                <img onClick={handleReset} src={reload} className={styles.reload}/>
            </div>            
            <div className={styles.time_table}>
                {renderTimeTable()}
            </div>            
        </div>
    );
}