import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SessionCheck, SESSION_LOST, SESSION_FOUND, LOG_IN_SUCCESS } from '../actions/auth';
import { endpoint } from "../config/url";
import { Redirect } from 'react-router';

export const AppContainer = (props) => {
    const auth = useSelector((store)=> store.auth);
    const dispatch = useDispatch();      

    useEffect(() => {                        
        // if (auth.state == SESSION_LOST && (props.history.location.pathname != endpoint.login) && (props.history.location.pathname != endpoint.register)) {
        //     props.history.push(endpoint.login);
        // }
        // else if (auth.state == LOG_IN_SUCCESS) {
        //     props.history.push(endpoint.home);
        // }
    }, [auth]);

    useEffect(() => {
        // console.log("address changed");
        // dispatch(SessionCheck());
    }, [props.history.location.pathname]);

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}