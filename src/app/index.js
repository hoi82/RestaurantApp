import React from "react";
import styles from "./styles.scss";
import Dialog from "../components/Dialog";
import { renderRoutes } from "react-router-config";
import { hot } from "react-hot-loader";
import ErrorBoundary from "../components/ErrorBoundary";

const App = ({history, route}) => {       
    return (
        <ErrorBoundary>            
            <div className={styles.box}>
                <img className={styles.bgimg}></img>                            
                {renderRoutes(route.routes)}                           
            </div>                  
            <Dialog/>            
        </ErrorBoundary>  
    );
};

export default hot(module)(App);