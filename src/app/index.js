import React from "react";
import styles from "./styles.scss";
import Dialog from "../components/Dialog";
import { renderRoutes } from "react-router-config";
import { hot } from "react-hot-loader";
import { AuthContainer } from "./AuthContainer";
import ErrorBoundary from "../components/ErrorBoundary";

const App = (props) => {       
    return (
        <ErrorBoundary>
            <div className={styles.box}>
                <img className={styles.bgimg}></img>            
                {renderRoutes(props.route.routes)}
                <Dialog/>
                <AuthContainer history={props.history}/>
            </div>      
        </ErrorBoundary>  
    );
};

export default hot(module)(App);