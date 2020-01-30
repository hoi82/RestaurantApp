import React, { PureComponent } from "react";
import Router, { Route, BrowserRouter} from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import PropTypes from 'prop-types';
import styles from "./App.module.scss";
import bg from "../image/wall.jpg";

class App extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div className={styles.box}>
                    <img src={bg} className={styles.bgimg}></img>
                    <Route exact path="/" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>                    
                </div>
            </BrowserRouter>            
        );
    }
}

App.propTypes = {

};

export default App;