import React from 'react';
import styles from "./styles.scss";
import reload from "../../image/reload.svg";
import moment from "moment-timezone";

export default function TimePicker({available = [], interval = {hour:1, minute: 0},
    time = "", reserved = [], timezone = "America/Havana",
    display={maxWidth: "640px", height: "auto"}, onTimeChange, onFocus, onBlur, onRefresh}) {    
    const fillAllEmpty = () => {
        const arr = [];
        for (let i = 0; i < 25; i++) {            
            arr.push(
                <button type="button" key={i} className={styles.disabled} disabled>{moment({hour: i, minute: 0}).format("HH:mm")}</button>
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

    const handleBlur = (e) => {        
        if ((!e.relatedTarget || !(e.currentTarget.contains(e.relatedTarget))) && (typeof onBlur == "function")) {
            onBlur(e);
        }        
    }

    return (
        <div className={styles.container} style={{maxWidth: display.maxWidth, height: display.height}}>
            <div className={styles.indicator}>                
                <span>{time ? moment(time).tz(timezone).locale(moment.locale()).format("HH:mm") : "--:--"}</span>
                {/* <img onClick={onRefresh} src={reload} className={styles.reload}/> */}
                <svg className={styles.reload} enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m504.554 233.704-76.447 91.467c-6.329 7.572-15.417 11.479-24.571 11.479-7.238 0-14.516-2.443-20.504-7.447l-91.467-76.447c-13.561-11.334-15.366-31.515-4.032-45.075s31.515-15.366 45.075-4.032l37.506 31.347c-10.274-74.891-74.668-132.774-152.337-132.774-84.793.001-153.777 68.985-153.777 153.778s68.984 153.777 153.777 153.777c17.673 0 32 14.327 32 32s-14.327 32-32 32c-58.17 0-112.859-22.653-153.991-63.785-41.133-41.133-63.786-95.822-63.786-153.992s22.653-112.859 63.786-153.992c41.132-41.132 95.821-63.785 153.991-63.785s112.859 22.653 153.992 63.785c32.517 32.516 53.471 73.508 60.829 117.991l22.849-27.339c11.334-13.56 31.515-15.364 45.075-4.032 13.56 11.335 15.365 31.516 4.032 45.076z"/>
                </svg>
            </div>            
            <div className={styles.time_table} onFocus={onFocus} onBlur={handleBlur}>
                {renderTimeTable()}
            </div>            
        </div>
    );
}