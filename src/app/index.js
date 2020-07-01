import React, { useEffect } from "react";
import styles from "./styles.scss";
import Dialog from "../components/Dialog";
import { renderRoutes } from "react-router-config";
import { hot } from "react-hot-loader";
import ErrorBoundary from "../components/ErrorBoundary";
import classNames from "classnames/bind";
import theme from "../theme/theme.scss";

const cx = classNames.bind(theme);

const App = ({route}) => {    
    useEffect(() => {
        document.documentElement.classList.toggle(cx("light_theme"));
    }, []);

    return (
        <ErrorBoundary>            
            <div className={styles.box}>                
                {renderRoutes(route.routes)}                
            </div>               
            <Dialog/>            
        </ErrorBoundary>  
    );
};

export default hot(module)(App);