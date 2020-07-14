import React, { useRef } from 'react';
import styles from "./HeaderProfile.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from '../../actions/auth';
import { showDialog } from '../../actions/common/dialog';
import Login from '../../components/Login';
import Popup from '../../components/Popup';

function HeaderProfile(props) {
    const auth = useSelector((store) => store.auth);    
    const dispatch = useDispatch();
    const btnRef = useRef();    

    const handleLogin = (e) => {
        dispatch(showDialog({
            bgimg: false,
            buttons: true,            
            content: <Login/>
        }))
    }

    const handleLogOut = (e) => {
        dispatch(LogOut());
    }

    if (auth.isLogin) {
        return (
            <React.Fragment>
                <button ref={btnRef} className={styles.logged_btn}>            
                    <div className={styles.name_plate}>
                        <span className={styles.name}>{auth.name}</span>
                        <span className={styles.email}>{auth.email}</span>
                        <img/>
                    </div>
                </button>
                <Popup trigger={btnRef} position={{top: "64px", right: "0"}}>
                    <div className={styles.profile_popup}>
                        <div className={styles.profile}>
                            <div className={styles.name_plate}>
                                <span className={styles.name}>{auth.name}</span>
                                <span className={styles.email}>{auth.email}</span>
                            </div>
                        </div>
                        <button data-closebutton={true} className={styles.profile_btn}>Messages</button>
                        <button data-closebutton={true} className={styles.profile_btn} onClick={handleLogOut}>Logout</button>
                    </div>
                </Popup>
            </React.Fragment> 
        )
    }
    else {
        return (
            <button className={styles.login_btn} onClick={handleLogin}>
                <span>Guest</span>
            </button>
        )
    }
}

export default HeaderProfile;