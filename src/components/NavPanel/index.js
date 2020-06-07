import React from 'react';
import global from "../../theme/global.scss";

export default ({bgColor, width, hideShadow, padding, positionRelative = true, children}) => {
    const panel = {
        position: "absolute",
        left: "0",
        top: "0",        
        backgroundColor: bgColor || global.nav_bg_color,
        width: width || "400px",
        height: "100%",            
        boxSizing: "border-box",
        minHeight: "620px",
        boxShadow: hideShadow ? null : "2px 0px 10px 0 rgba(0,0,0,0.5)",        
    }; 
    
    const container = {
        position: "absolute",
        left: "0",
        top: "0",       
        width: width || "400px",
        height: "100%",    
        padding: padding || "40px", 
        boxSizing: "border-box",
        minHeight: "620px",        
    }

    const relativeContainer = {
        position: "relative",        
        width: width || "400px",
        height: "100%",    
        padding: "0", 
        boxSizing: "border-box",
        minHeight: "620px",
    }   

    return (
        positionRelative 
        ? 
            <div style={relativeContainer}>
                <div style={panel}/>
                <div style={container}>
                    {children}
                </div>            
            </div>
        
        : 
            <React.Fragment>
                <div style={panel}/>
                <div style={container}>
                    {children}
                </div>            
            </React.Fragment>                
    );
}