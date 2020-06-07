import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.scss";

export default function Popup({children, triggerID, position={top: "auto", right: "auto", bottom: "auto", left: "auto"}}) {
    const contextRef = useRef();
    const [open, setOpen] = useState(false);

    useEffect(() => {               
        if (triggerID) {            
            document.getElementById(triggerID).addEventListener("click", toggleOpen);
        }        
        document.addEventListener("click", detectContextElement);        

        return () => {            
            if (triggerID) {                
                document.getElementById(triggerID).removeEventListener("click", toggleOpen);
            }            
            document.removeEventListener("click", detectContextElement);            
        } 
    }, []);

    const detectContextElement = (e) => {                
        if (contextRef.current && (!contextRef.current.contains(e.target)) && (e.target != document.getElementById(triggerID))) {
            if (e.target.className.indexOf("react-calendar__year-view__months__month") > -1) {

            } else {                
                setOpen(false);
            }            
        }
    }

    const toggleOpen = (e) => {        
        setOpen(prev => !prev);
    }
    
    return (
        open ? <div className={styles.popup} style={position} ref={contextRef}>
            {children}
        </div> : null
    );
}