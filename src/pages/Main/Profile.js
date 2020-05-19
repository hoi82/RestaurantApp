import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Profile.module.scss";
import { LogOut } from '../../actions/auth';
import settingIcon from "../../image/settings.svg";
import logoutIcon from "../../image/logout.svg";

export default (props) => {
    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();    

    const handleLogOut = (e) => {
        dispatch(LogOut());
    }

    return (
        <div className={styles.profile}>            
            <div className={styles.container}>
                <div className={styles.nameplate}>
                    <span className={styles.name}>{auth.name}</span>
                    <span className={styles.email}>{auth.email}</span>
                </div>       
                <div className={styles.toolbox}>
                    <button className={styles.tool_button}>
                        <img className={styles.icon} src={settingIcon}/>                        
                    </button>
                    <button className={styles.tool_button} onClick={handleLogOut}>
                        <img className={styles.icon} src={logoutIcon}/>
                    </button>                    
                </div>         
            </div>
        </div>
    );
}