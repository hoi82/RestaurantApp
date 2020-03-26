import React from "react";
import { Route, BrowserRouter} from "react-router-dom";
import styles from "./App.module.scss";
import bg from "../image/wall.jpg";
import Dialog from "./common/Dialog";
import loadable from "@loadable/component";

const Main = loadable(() => import("./main/Main"));
const Login = loadable(()=> import("./login/Login"));
const Register = loadable(()=> import("./register/Register"));

export default function App() {
    return (
        <BrowserRouter>
            <div className={styles.box}>
                <img src={bg} className={styles.bgimg}></img>
                <Route exact path="/login" component={Login}/>
                <Route path="/register" component={Register}/>   
                <Route path="/" component={Main}/>
                <Dialog/>
            </div>
        </BrowserRouter>            
    );    
}