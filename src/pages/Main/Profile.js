import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Profile.module.scss";
import { LogOut, SESSION_LOST, LOG_IN_FAILED, LOG_IN_SUCCESS, SESSION_FOUND } from '../../actions/auth';
import settingIcon from "../../image/settings.svg";
import logoutIcon from "../../image/logout.svg";
import { endpoint } from '../../config/url';
import { Link } from 'react-router-dom';
import { showDialog, closeDialog } from '../../actions/common/dialog';
import Login from '../../components/Login';

export default (props) => {
    const auth = useSelector((store) => store.auth);    
    const dispatch = useDispatch();          

    const handleLogOut = (e) => {
        dispatch(LogOut());
    }

    const handleLogin = (e) => {
        dispatch(showDialog({
            bgimg: false,
            buttons: true,            
            content: <Login/>
        }))
    }        

    return (
        auth.isLogin ? 
        <div className={styles.profile}>                        
            <div className={styles.nameplate}>
                <span className={styles.name}>{auth.name}</span>
                <span className={styles.email}>{auth.email}</span>
            </div>       
            <div className={styles.toolbox}>  
                <Link to={endpoint.options} style={{height: "28px"}}>
                    <img className={styles.icon} src={settingIcon}/>
                </Link>                
                <img className={styles.icon} src={logoutIcon} onClick={handleLogOut}/>
            </div>            
        </div>
        : 
        <div className={styles.no_member}>
            <span className={styles.description}>You are not logged in</span>
            <button className={styles.login_btn} onClick={handleLogin}>Login</button>
            {/* <div>
                <span className={styles.sub_title}>아직 가입하지 않으셨나요?</span>
                <Link className={styles.register_btn} to={{pathname: endpoint.register}}>
                    <span>가입하기</span>
                </Link>
            </div>             */}
        </div>
    );
}