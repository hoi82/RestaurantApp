import React, { useState, useEffect, useRef } from 'react';

const Item = (props) => {
    return (
        <button className={props.className} onClick={props.onClick}>{props.item}</button>
    );
};

export default (props) => {
    const [boxOpen, setBoxOpen] = useState(false);    
    const [displayedItems, setDisplayedItems] = useState([]);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState(props.value || "");
    const [selected, setSelected] = useState({index: -1});               

    useEffect(() => {                      
        //컴포넌트 하나만 렌더링 하고싶다 ㅠㅠ 그러나 안되는것
        setDisplayedItems(getRenderingItems(items));
    },[selected]);  
    
    useEffect(() => {
        setSelected({ index: -1 });
        props.itemSelector(value).then((items) => {
            setItems(items);
        });
    }, [value]);

    useEffect(() => {
        setDisplayedItems(getRenderingItems(items));
    }, [items]);

    useEffect(() => {
        if (!boxOpen)
            setSelected({ index: -1 });            
    }, [boxOpen])

    const handleChange = (e) => {                
        setValue(e.target.value);              
        if (!boxOpen) {
            setBoxOpen(true);
        }                      
    }    

    const getRenderingItems = (items) => {
        return items.map((item, i) => {
            return <Item className={selected.index == i ? props.itemClass.concat(" ", props.itemSelectedClass) : props.itemClass} 
            key={i} item={item} selected={selected} onClick={handleItemClick}/>
        });
    }

    const handleItemClick = (e) => {
        //NOTE:span, ul, li등등 text가 content로 올때 text를 얻어내는 방법
        //e.currentTarget.textContent        
        setBoxOpen(false);
        setValue(e.currentTarget.textContent);
    }

    const handleBlur = (e) => {        
        if (e.relatedTarget == null) {
            setBoxOpen(false);
        }        
    }    

    const handleNavigation = (e) => {                   
        if (e.key == "ArrowDown") {                                 
            setSelected(prev => {
                if (prev.index < displayedItems.length - 1) {
                    return { index: prev.index + 1 };
                }
                else {
                    return { index: 0 };
                }
            });                     
        }
        else if (e.key == "ArrowUp") {
            setSelected(prev => {
                if (prev.index > 0) {
                    return { index: prev.index - 1 };
                }
                else {                    
                    return { index: displayedItems.length - 1 };
                }
            })
        }  
        else if (e.key == "Escape") {
            setBoxOpen(false);
        }
        else if (e.key == "Enter") {            
            if (e.target.id == "input") {
                if (selected.index > -1) {
                    setValue(displayedItems[selected.index].props.item);                    
                    setBoxOpen(false);
                }
            }
        }        
    };

    const handleInputClick = (e) => {
        setBoxOpen(!boxOpen);
    }

    return (
        <div onBlur={handleBlur} style={{position: "relative"}} onKeyDown={handleNavigation}>
            <input id="input" type="text" className={props.inputClass} value={value} onChange={handleChange} onClick={handleInputClick} width={props.width}/>
            <div id="panel" style={{display: boxOpen ? null : "none"}} className={props.panelClass}>
                {displayedItems}
            </div>            
        </div>
    );
};