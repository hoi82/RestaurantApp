import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.scss";
import { string } from 'prop-types';

export default function Popup({children, trigger, position={top: "auto", right: "auto", bottom: "auto", left: "auto"}, onOpen, onClose}) {
    const contextRef = useRef();
    const [open, setOpen] = useState(false);        

    useEffect(() => {                               
        if (trigger && trigger.current) {
            trigger.current.addEventListener("click", toggleOpen);
        }

        if (document) {
            document.addEventListener("click", detectContextElement);
        }        

        return () => {            
            if (trigger && trigger.current) {
                trigger && trigger.current.removeEventListener("click", toggleOpen);
            }       

            if (document) {
                document.removeEventListener("click", detectContextElement);
            }                 
        } 
    }, []);

    useEffect(() => {
        if (open && (typeof onOpen == "function")) {
            onOpen();
        }
        else if (typeof onClose == "function") {
            onClose();
        }
    }, [open])

    const detectContextElement = (e) => {        
        if (contextRef.current && (!contextRef.current.contains(e.target)) && (trigger && !trigger.current.contains(e.target))) {            
            if ((typeof e.target.className) == "string" && e.target.className.indexOf("react-calendar__year-view__months__month") > -1) {

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