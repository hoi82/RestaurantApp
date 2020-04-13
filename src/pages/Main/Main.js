import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router";

export default function Main(props) {
    const [sid, setSid] = useState(null);    
    
    if (sid == null) {   
        Axios.get("http://localhost:3005/api/users/auth", {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true                
        }).then((res) => {}).catch((err) => console.log(err));            
    } 
    else { 
        //세션 다르면 기록하는 부분
        Axios.get("http://localhost:3005/api/users/auth", {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {}).catch((err) => console.log(err));        
    }        
    return (        
            sid != null ? <React.Fragment>
                <div>
                    <div/>                                     
                </div>
            </React.Fragment> : <Redirect to="/login"/>
    );    
}