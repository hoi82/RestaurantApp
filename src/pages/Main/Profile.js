import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./Profile.module.scss";

export default (props) => {
    const dispatch = useDispatch();
    //TODO:Register 부분 location.state 이용해서 분기하는 방법 구현해볼것.
    //같은 url link로 호출할시 AJAX 때문에 랜더는 호출되지만 전체 리로딩은 안되는듯.
    //만약 퍼포먼스 이슈 생기면 예전처럼 갈것.
    return (
        <div className={styles.profile}>            
            <div className={styles.container}>
                <div className={styles.nameplate}>
                    <span className={styles.name}>Lorem Ipsum</span>
                    <span className={styles.email}>Lorem Ipsum@ipsum.com</span>
                </div>       
                <div className={styles.toolbox}>
                    <button className={styles.tool_button}>
                        <img className={styles.setting_Icon}/>                        
                    </button>
                    <button className={styles.tool_button}>
                        <img className={styles.logout_Icon}/>
                    </button>                    
                </div>         
            </div>
        </div>
    );
}