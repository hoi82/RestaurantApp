import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog } from '../actions/common/dialog';
import { DialogMode } from '../types/Variables';
import { SessionCheck } from '../actions/auth';
import { endpoint } from "../config/url";

export const AuthContainer = (props) => {
    const authInfo = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {         
        if (authInfo.isLogIn)
        {
            if (props.history.location.pathname == endpoint.login) {
                props.history.push(endpoint.home);
            }   
            else {
                // dispatch(SessionCheck()).then(() => {
                //     if (!authInfo.isLogIn) {
                //         if (props.history.location.pathname != "/login") {
                //             props.history.push("/login");
                //         }   
                //     }
                // });
            }         
        }

        else 
        {                      
            if (authInfo.error) {
                dispatch(showDialog({
                    mode: DialogMode.ALERT,
                    content: authInfo.error
                }));                
            }
            else {
                // if (props.history.location.pathname != "/login") {
                //     props.history.push("/login");
                // }   
            }
        }
    }, [authInfo]);              

    return (
        <React.Fragment/>
    );
}