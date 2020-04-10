import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './nav/Nav';
import axios from "axios";

export default function Main(props) {
    const [sid, setSid] = useState(null);    
    
    if (sid == null) {   
        // axios.get("http://localhost:3005/api/users/auth", {
        //     headers: {                
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     withCredentials: true                
        // }).then((res) => {}).catch((err) => console.log(err));            
    } 
    else { 
        //세션 다르면 기록하는 부분
        // axios.get("http://localhost:3005/api/users/auth", {
        //     headers: {                
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     withCredentials: true
        // }).then((res) => {}).catch((err) => console.log(err));        
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