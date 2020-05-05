import React, { useState, useEffect } from 'react';
import Content from "./Content";
import { DialogMode } from "../../types/Variables";
import styles from "./Register.module.scss";
import global from "../../theme/global.scss";
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from '../../actions/common/dialog';
import TOS from "./TOS/TOS";
import NavPanel from "../../components/NavPanel";
import Nav from "./Nav";
import { FetchRegister, REGISTER_FETCHED, REGISTER_FAILED } from '../../actions/register/status';

export default function Register({history, location}) {       
    const [tosAgree, setTOSAgree] = useState(false);    
    const dispatch = useDispatch();
    const profile = useSelector((store) => store.register.profile);
    const payments = useSelector((store) => store.register.payments);
    const status = useSelector((store) => store.register.status);

    useEffect(() => {
        switch (status.status) {
            case REGISTER_FETCHED:
                dispatch(showDialog({
                    mode: DialogMode.SUCCESS,
                    content: "가입을 축하드립니다. \r\n 닫기를 누르시면 로그인 화면으로 이동합니다.",
                    onClose: () => history.replace("/login")
                }));
                break;
            case REGISTER_FAILED:
                console.log(status.info);
                dispatch(showDialog({
                    mode: DialogMode.ALERT,
                    content: `에러가 발생했습니다.(${status.info})`,                    
                }))
                break;
            default:
                break;
        }
    }, status);

    const renderContent = () => {                    
        return tosAgree ? 
        <React.Fragment>       
            <NavPanel width={global.register_nav_width} padding="0" hideShadow={true} positionRelative={true}>
                <Nav history={history} location={location} onRegister={handleRegister}/>
            </NavPanel>                 
            <Content location={location}></Content>            
        </React.Fragment>                                        
        :
        <TOS onConfirm={tosConfirm}/>;
    }

    const handleRegister = () => {                  
        dispatch(FetchRegister(profile, payments));                     
    }    

    const tosConfirm = (agreed) => {
        if (agreed) {
            setTOSAgree(true);            
        }
        else {
            history.goBack();            
        }
    }    
    
    return (        
        <div className={styles.register}>   
            <div className={styles.panel}/> 
            <div className={styles.container}>
                { renderContent() }                
            </div>                                            
        </div>        
    );    
}