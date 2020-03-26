import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './nav/Nav';

export default function Main(props) {
    const [sid, setSid] = useState(localStorage.getItem("sid"));    
    console.log(sid);
    if (sid == null) {
        console.log("null");
        fetch("http://localhost:3005/api/users/auth", {
        method: "GET",              
        headers: {                
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        }).then((res) => res.json()).then((data) => {
            setSid(data.session);
        }).catch((err) => console.log(err));
    } 
    else { 
        fetch("http://localhost:3005/api/users/auth", {
        method: "GET",              
        headers: {                
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        }).then((res) => res.json()).then((data) => {
            if (data.session != sid) {
                setSid(data.session);
            }            
        }).catch((err) => {
            console.log(err);
            setSid(null);
        });
    }    

    return (        
            sid != null ? <React.Fragment>
                <div>
                    <div/>
                    <Nav/>                    
                </div>
            </React.Fragment> : <Redirect to="/login"/>
    );    
}