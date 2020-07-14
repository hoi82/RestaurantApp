import React, { useState, useEffect } from 'react';
import styles from "./style.scss";
import arrow from "../../image/down-arrow.svg";

const Item = ({className, onClick, item}) => {    
    const handleClick = (e) => {
        onClick(item);
    };     
    return (
        <button className={className} onClick={handleClick}>{item.name ? item.name : item}</button>
    );
};

export default ({items=[], onChange, value, width, editable, onFocus, onBlur}) => {   
    //TODO: 두개가 있을 경우 하나가 열려있는 상태에서 다른걸 클릭하면 원래 열려있던게 닫히지 않음. 
    //blur에서 relatedTarget에 다른 dropbox일때도 추가함(name으로 판별했는데 좀더 안전한 방법으로 해야할듯).
    const [boxOpen, setBoxOpen] = useState(false);         
    const [selected, setSelected] = useState({index: -1});            

    useEffect(() => {
        if (boxOpen) {
            
        }
        else {            
            setSelected({ index: -1 });
        }            
    }, [boxOpen]);

    const fireBlur = (e) => {
        if (typeof onBlur == "function")
            onBlur(e);
    }

    const renderContents = () => {                
        if (boxOpen && items.length > 0) {
            return <div style={{display: boxOpen ? null : "none"}} className={styles.item_panel}>                  
                <div className={styles.inner_panel}>                    
                    {getRenderingItems(items)}
                </div> 
            </div>
        }
        else {
            return null;
        }
    }

    const handleChange = (e) => {
        onChange(e.target.value);            
        if (!boxOpen) {
            setBoxOpen(true);            
        }                      
    }    

    const getRenderingItems = (items) => { 
        if (!items || !items.map) return [];

        return items.map((item, i) => {
            return <Item className={selected.index == i ? styles.item.concat(" ", styles.item_selected) : styles.item} 
            key={i} item={item} onClick={handleItemClick}/>            
        });
    }

    const handleItemClick = (item) => {
        //NOTE:span, ul, li등등 text가 content로 올때 text를 얻어내는 방법
        //e.currentTarget.textContent        
        setBoxOpen(false);
        onChange(item);
        fireBlur();
    }

    const handleBlur = (e) => {               
        if (e.relatedTarget == null || e.relatedTarget.name == "input") {
            setBoxOpen(false);    
            fireBlur(e);              
        }        
    }    

    const handleNavigation = (e) => {                   
        if (e.key == "ArrowDown") {             
            setSelected(prev => {                
                if (prev.index < items.length - 1) {
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
                    return { index: items.length - 1 };
                }
            })
        }  
        else if (e.key == "Escape") {
            setBoxOpen(false);            
        }
        else if (e.key == "Enter") {
            if (e.target.name == "input") {
                if (selected.index > -1) {                    
                    onChange(items[selected.index]);
                    setBoxOpen(false);
                }   
            }                     
        }        
    };

    const handleInputClick = (e) => {
        if (boxOpen) {
            fireBlur(e);
        }
        else if (typeof onFocus == "function") {
            onFocus(e);
        }
        setBoxOpen(!boxOpen);
    }         

    return (
        <div onBlur={handleBlur} className={styles.dropdown} onKeyDown={handleNavigation} style={{maxWidth: width}}>
            { editable ? 
                <input type="text" name="input" autoComplete="off" className={styles.input} value={value} onFocus={onFocus} onChange={handleChange} onClick={handleInputClick}/>
                :
                <div className={styles.display} style={{maxWidth: width}}>
                    <span>{value}</span>
                    <button type="button" onClick={handleInputClick}><img src={arrow} style={{transform: boxOpen ? "rotate(0.5turn)" : "rotate(0turn)"}}/></button>
                </div>
            }            
            {renderContents()}                                   
        </div>
    );
};