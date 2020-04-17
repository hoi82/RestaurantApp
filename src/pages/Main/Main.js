import React from "react";
import NavPanel from "../../components/NavPanel";
import global from "../../theme/global.scss";
import Nav from "./Nav";
import styles from "./Main.module.scss";
import { renderRoutes } from "react-router-config";
import { endpoint } from "../../config/url";

export default function Main(props) {             
    return (        
        <React.Fragment>            
            <div className={styles.content}>
                { props.location.pathname == endpoint.home ? <div/> : renderRoutes(props.route.routes) }                 
            </div>    
            <NavPanel width={global.main_nav_width} padding="0">
                <Nav/>
            </NavPanel>                    
        </React.Fragment>
    );    
}