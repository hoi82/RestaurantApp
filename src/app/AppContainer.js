import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SessionCheck, SESSION_LOST, SESSION_FOUND, LOG_IN_SUCCESS } from '../actions/auth';
import { endpoint } from "../config/url";
import { Redirect, useHistory } from 'react-router';

export const AppContainer = ({children}) => {
    const auth = useSelector((store)=> store.auth);
    const history = useHistory();
    const dispatch = useDispatch();      

    useEffect(() => {                        
        // if (auth.state == SESSION_LOST && (history.location.pathname != endpoint.login) && (history.location.pathname != endpoint.register)) {
        //     history.push(endpoint.login);
        // }
        // else if (auth.state == LOG_IN_SUCCESS) {
        //     history.push(endpoint.home);
        // }
    }, [auth]);

    useEffect(() => {
        // console.log("address changed");
        // dispatch(SessionCheck());
    }, [history.location.pathname]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}