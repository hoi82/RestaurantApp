import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import Dialog from "./common/Dialog";
import routes from "../routes";

export default function App(props) {    
    return (        
        <div className={styles.box}>
            <img className={styles.bgimg}></img>            
            <Switch>
                {
                    routes.map((route, i) => (
                        <Route
                            key={i}
                            exact={!!route.exact}
                            path={route.path}
                            render={ rednerProps => (<route.component {...props} {...rednerProps}/>) }
                        />
                    ))
                }
            </Switch>
            <Dialog/>
        </div>        
    );    
}

if (module.hot) {
    console.log("hot");
    module.hot.accept();
}