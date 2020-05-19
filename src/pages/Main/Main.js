import React, { useEffect, useState } from "react";
import NavPanel from "../../components/NavPanel";
import global from "../../theme/global.scss";
import Nav from "./Nav";
import styles from "./Main.module.scss";
import { renderRoutes } from "react-router-config";
import { endpoint } from "../../config/url";
import { useSelector, useDispatch } from "react-redux";
import { SessionCheck, LOG_IN_FAILED, SESSION_LOST, SESSION_FOUND, AUTH_READY } from "../../actions/auth";
import { Redirect } from "react-router";

export default function Main({route, location}) {
    const auth = useSelector((store) => store.auth);
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.state == LOG_IN_FAILED || auth.state == SESSION_LOST || auth.state == AUTH_READY) {
            setIsLogin(false);
        }
        else if (auth.state == SESSION_FOUND) {
            setIsLogin(true);
        }        
    }, [auth]);

    useEffect(() => {
        dispatch(SessionCheck());
    }, [location.pathname]);
        
    return (        
        isLogin ? <React.Fragment>            
            <div className={styles.content}>
                { location.pathname == endpoint.home ? null : renderRoutes(route.routes) }
            </div>    
            <NavPanel width={global.main_nav_width} padding="0">
                <Nav/>
            </NavPanel>                    
        </React.Fragment>
        :
        <Redirect to={{pathname: endpoint.login}}/>
    );    
}