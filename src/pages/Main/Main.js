import React from "react";
import Nav from "./Nav";
import styles from "./Main.module.scss";
import { renderRoutes } from "react-router-config";
import { endpoint } from "../../config/url";
import Header from "./Header";
import Footer from "./Footer";

export default function Main({route, location}) {        
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
            <footer className={styles.footer_menu}>
                <Footer/>
            </footer>                     
        </div>        
    );    
}