import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.scss";
import { string } from 'prop-types';

export default function Popup({children, triggerID, position={top: "auto", right: "auto", bottom: "auto", left: "auto"}}) {
    const contextRef = useRef();
    const [open, setOpen] = useState(false);    

    useEffect(() => {                       
        if (!!triggerID && document && document.getElementById(triggerID)) {
            document.getElementById(triggerID).addEventListener("click", toggleOpen);
        }        

        if (document) {
            document.addEventListener("click", detectContextElement);
        }        

        return () => {            
            if (!!triggerID && document && document.getElementById(triggerID)) {
                document.getElementById(triggerID).removeEventListener("click", toggleOpen);
            }       
            if (document) {
                document.removeEventListener("click", detectContextElement);
            }                 
        } 
    }, []);        

    const detectContextElement = (e) => {                        
        if (contextRef.current && (!contextRef.current.contains(e.target)) && (e.target != document.getElementById(triggerID))) {            
            if (!!e.target.className && e.target.className.indexOf("react-calendar__year-view__months__month") > -1) {

            } else {                
                setOpen(false);
            }            
        }
    }

    const toggleOpen = (e) => {        
        setOpen(prev => !prev);
    }

    const handleClose = (e) => {
        if (e.target.dataset.closebutton) {
            setOpen(false);
        }
    }
    
    return (
        open ? <div className={styles.popup} style={position} ref={contextRef} onClick={handleClose}>
            {children}
        </div> : null
    );
}