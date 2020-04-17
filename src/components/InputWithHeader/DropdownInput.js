import React, { useState } from 'react';

export default (props) => {
    const [boxOpen, setBoxOpen] = useState(true);    
    const [displayedItems, setDisplayedItems] = useState([]);
    const [value, setValue] = useState(props.value || "");

    const handleChange = (e) => {        
        setValue(e.target.value);
        if (!boxOpen) {
            setBoxOpen(true);
        }
        
        setDisplayedItems(props.items ? props.items.filter((item) => item.indexOf(e.target.value) > -1) : []);        
    }

    const renderFilteredItems = () => {        
        return displayedItems.length == 0 ? null : displayedItems.map((item, i) => {
            return props.itemRenderer(item, i, handleItemClick);
        });        
    }

    const handleItemClick = (e) => {
        //NOTE:span, ul, li등등 text가 content로 올때 text를 얻어내는 방법
        //e.currentTarget.textContent        
        setBoxOpen(false);
        setValue(e.currentTarget.textContent);
    }

    const handleBlur = (e) => {
        //NOTE:
        if (e.relatedTarget == null) {
            setBoxOpen(false);
        }        
    }

    const handleFocus = (e) => {
        setBoxOpen(true);
        setDisplayedItems(props.items ? props.items.filter((item) => item.indexOf(e.target.value) > -1) : []);
    }    

    return (
        <div onBlur={handleBlur} style={{position: "relative"}}>
            <input type="text" className={props.inputStyle} value={value} onChange={handleChange} onFocus={handleFocus} width={props.width}/>
            <div style={{display: boxOpen ? null : "none"}} className={props.panelStyle}>
                {renderFilteredItems()}
            </div>            
        </div>
    );
};