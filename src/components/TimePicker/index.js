import React from 'react';
import styles from "./styles.scss";
import reload from "../../image/reload.svg";
import moment from "moment-timezone";

export default function TimePicker({available = [], interval = {hour:1, minute: 0},
    time = "", reserved = [], timezone = "America/Havana",
    display={maxWidth: "640px", height: "auto"}, onTimeChange, onFocus, onBlur}) {    
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
        if (available.length == 0)
            return fillAllEmpty();

        const tables = [];                   

        const s = moment(available[0].start).tz(timezone);
        const e = moment(available[available.length - 1].end).tz(timezone);

        for (let i = s.valueOf();
            i <= e.valueOf(); 
            i = i + interval.hour * 3600 * 1000 + interval.minute * 60 * 1000) {                    
            tables.push(moment(i));
        }        

        return tables.map((t, i) => {
            const timeStr = t.locale(moment.locale()).format("HH:mm");  
            //available 이외는 비활성화          
            if (!available.find((item, j) => {
                let inclusivity = "[]";                
                if (j == 0) {
                    inclusivity = "[)";
                } 
                else if (j == available.length - 1) {
                    inclusivity = "(]";
                }
                else {
                    inclusivity = "()";
                }
                return t.isBetween(moment(item.start), moment(item.end), undefined, inclusivity);
            })) {
                return <button type="button" key={i} className={styles.disabled} disabled>{timeStr}</button>
            }
            //현재 시간 전은 모두 비활성화
            else if (t.isSameOrBefore(Date.now())) {
                return <button type="button" key={i} className={styles.disabled} disabled>{timeStr}</button>
            }
            //reserved에 걸리면 비활성화 + 경고색
            else if (reserved.filter((res) => {                                
                return t.isSame(moment(res.time));
            }).length > 0) {                
                return <button type="button" key={i} className={styles.reserved} disabled>{timeStr}</button>
            }            
            else {                                
                const className = t.isSame(time) ? styles.selected : null;
                return  <button type="button" className={className} key={i} data-value={t.valueOf()} onClick={handleTimeClick}>{timeStr}</button>
            }            
        });        
    }

    const handleTimeClick = (e) => {
        const selected = moment(Number(e.target.dataset.value));
        onTimeChange(moment(selected).format());       
    }

    const handleReset = () => {
        onTimeChange(null, null);
    }        

    const handleBlur = (e) => {        
        if ((!e.relatedTarget || !(e.currentTarget.contains(e.relatedTarget))) && (typeof onBlur == "function")) {
            onBlur(e);
        }        
    }

    return (
        <div className={styles.container} style={{maxWidth: display.maxWidth, height: display.height}}>
            <div className={styles.indicator}>                
                <span>{time ? moment(time).tz(timezone).locale(moment.locale()).format("HH:mm") : "--:--"}</span>
                <img onClick={handleReset} src={reload} className={styles.reload}/>
            </div>            
            <div className={styles.time_table} onFocus={onFocus} onBlur={handleBlur}>
                {renderTimeTable()}
            </div>            
        </div>
    );
}