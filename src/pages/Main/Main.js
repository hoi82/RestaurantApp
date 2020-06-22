import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import styles from "./Main.module.scss";
import { renderRoutes } from "react-router-config";
import { endpoint } from "../../config/url";
import { useSelector, useDispatch } from "react-redux";
import { SessionCheck, LOG_IN_FAILED, SESSION_LOST, SESSION_FOUND, AUTH_READY } from "../../actions/auth";
import { Redirect, useHistory, useRouteMatch } from "react-router";
import Header from "./Header";

export default function Main({route, location}) {
    const auth = useSelector((store) => store.auth);
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();    
    const history = useHistory();
    const match = useRouteMatch(location.pathname);

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
        <div className={styles.main}>
            <header className={styles.header_menu}>
                <Header/>
            </header>
            <section className={styles.banner}></section>
            <div className={styles.content}>
                <Nav/>   
                <div className={styles.content_panel}>
                    { location.pathname == endpoint.home ? null : renderRoutes(route.routes) }
                </div>    
            </div>
            <footer className={styles.footer_menu}></footer>                     
        </div>        
    );    
}