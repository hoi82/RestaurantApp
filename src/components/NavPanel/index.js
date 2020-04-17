import React from 'react';
import global from "../../theme/global.scss";

export default (props) => {
    const panel = {
        position: "absolute",
        left: "0",
        top: "0",        
        backgroundColor: props.bgColor || global.nav_bg_color,
        width: props.width || "400px",
        height: "100%",            
        boxSizing: "border-box",
        minHeight: "620px",
        boxShadow: props.hideShadow ? null : "2px 0px 10px 0 rgba(0,0,0,0.5)"
    }; 
    
    const container = {
        position: "absolute",
        left: "0",
        top: "0",       
        width: props.width || "400px",
        height: "100%",    
        padding: props.padding || "40px", 
        boxSizing: "border-box",
        minHeight: "620px",
    }

    const relativeContainer = {
        position: "relative",        
        width: props.width || "400px",
        height: "100%",    
        padding: "0", 
        boxSizing: "border-box",
        minHeight: "620px",
    }   

    return (
        props.positionRelative 
        ? 
            <div style={relativeContainer}>
                <div style={panel}/>
                <div style={container}>
                    {props.children}
                </div>            
            </div>
        
        : 
            <React.Fragment>
                <div style={panel}/>
                <div style={container}>
                    {props.children}
                </div>            
            </React.Fragment>                
    );
}