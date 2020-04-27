import React, { useState, useEffect } from 'react';
import styles from "./style.scss";

const Item = (props) => {            
    return (
        <button className={props.className} onClick={props.onClick}>{props.item}</button>
    );
};

export default (props) => {
    //TODO: 드랍다운 표시 안될때 아이템과 패널이 아예 랜더링 안되도록 변경할것    
    const [boxOpen, setBoxOpen] = useState(false);    
    const [displayedItems, setDisplayedItems] = useState([]);    
    const [selected, setSelected] = useState({index: -1});        

    useEffect(() => {                      
        //컴포넌트 하나만 렌더링 하고싶다 ㅠㅠ 그러나 안되는것
        setDisplayedItems(getRenderingItems(props.items));        
    },[selected]);      

    useEffect(() => {
        setDisplayedItems(getRenderingItems(props.items));
    }, [props.items]);

    useEffect(() => {
        if (!boxOpen)
            setSelected({ index: -1 });            
    }, [boxOpen]);

    const renderContents = () => {
        if (boxOpen && displayedItems.length > 0) {
            return <div id="panel" style={{display: boxOpen ? null : "none"}} className={styles.item_panel}>                  
                <div className={styles.inner_panel}>
                    {displayedItems}
                </div> 
            </div>
        }
        else {
            return null;
        }
    }

    const handleChange = (e) => {
        props.onChange(e.target.value);            
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

    const handleItemClick = (e) => {
        //NOTE:span, ul, li등등 text가 content로 올때 text를 얻어내는 방법
        //e.currentTarget.textContent        
        setBoxOpen(false);
        props.onChange(e.currentTarget.textContent);
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
                    props.onChange(displayedItems[selected.index].props.item);                    
                    setBoxOpen(false);
                }
            }
        }        
    };

    const handleInputClick = (e) => {
        setBoxOpen(!boxOpen);
    }

    return (
        <div onBlur={handleBlur} className={styles.dropdown} onKeyDown={handleNavigation}>
            <input id="input" type="text" className={styles.input} value={props.value} onChange={handleChange} onClick={handleInputClick} width={props.width}/>            
            {renderContents()}                                   
        </div>
    );
};