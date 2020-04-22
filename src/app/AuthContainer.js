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

                //TODO: Sesstion Check 결과 리듀서에서 저장할때 islogin 바뀔때만 새 오브젝트로, 아닐 경우에는 스테이트만 변경
                // dispatch(SessionCheck());
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