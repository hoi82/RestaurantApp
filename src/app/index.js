import React from "react";
import styles from "./styles.scss";
import Dialog from "../components/Dialog";
import { renderRoutes } from "react-router-config";
import { hot } from "react-hot-loader";

const App = ({ route }) => {
    return (
        <div className={styles.box}>
            <img className={styles.bgimg}></img>            
            {renderRoutes(route.routes)}
            <Dialog/>
        </div>            
    );
};

export default hot(module)(App);