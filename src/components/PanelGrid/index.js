import React, { useState, useEffect } from 'react';
import styles from "./style.scss";

export default ({items, itemRenderer, showNavigator, layout}) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [layoutForm, setLayoutForm] = useState("Grid");
    const [pageNumber, setPageNumber] = useState(0);
    const [itemLength, setItemLength] = useState(0);

    useEffect(() => {
        if (layoutForm == "Grid") {
            if (layout)
                setItemLength((layout.grid.columns || 1) * (layout.grid.rows || 1));
        }
        else {
            if (layout)
                setItemLength((layout.list.rows));
        }
    }, layoutForm);

    useEffect(() => {        
        setDisplayedItems(getRenderingItems(items));
    }, [items, layoutForm, pageNumber]);

    const getRenderingItems = (items) => {
        if (showNavigator && layout) {            
            return items.slice(itemLength * pageNumber, itemLength * (pageNumber + 1)).map((item, i) => {
                return itemRenderer(item, i, layoutForm);
            });
        }else {
            return items.map((item, i) => {
                return itemRenderer(item, i, layoutForm);
            });           
        }        
    }    

    const getNavigationButtonCount = () => {
        return Math.min(10, (items.length % itemLength > 0 ? parseInt(items.length / itemLength) + 1 : parseInt(items.length / itemLength)));
    }
    
    const renderPageButtons = () => {        
        const buttons = [];
        const repeatlen = getNavigationButtonCount();

        for (let i = 0; i < repeatlen; i++) {
            buttons.push(<button data-number={i} key={i} className={i == pageNumber ? styles.selected : null} onClick={handlePageNumberClick}>
                <span>{i+1}</span>
            </button>);
        }   
        
        buttons.unshift(<button key={-3} onClick={handleMovePrev}>
            <img className={styles.prev}/>
        </button>);
        buttons.unshift(<button key={-4} onClick={handleMoveFirst}>
            <img className={styles.first}/>
        </button>);
        buttons.push(<button key={-2} onClick={handleMoveNext}>
            <img className={styles.next}/>
        </button>);            
        buttons.push(<button key={-1} onClick={handleMoveLast}>
            <img className={styles.last}/>
        </button>);

        if (repeatlen == 10) {
            
        }

        return buttons;
    }

    const gridClick = () => {
        setLayoutForm("Grid");
    }

    const listClick = () => {
        setLayoutForm("List");
    }

    const handleMoveFirst = (e) => {
        setPageNumber(0);
    }

    const handleMovePrev = (e) => {
        if (pageNumber > 0) {
            setPageNumber((prev) => prev - 1);
        }
    }

    const handleMoveNext = (e) => {
        if (pageNumber < getNavigationButtonCount() - 1)
            setPageNumber((prev) => prev + 1);
    }

    const handleMoveLast = (e) => {
        setPageNumber(getNavigationButtonCount() - 1);
    }

    const handlePageNumberClick = (e) => {        
        setPageNumber(parseInt(e.target.dataset.number));
    } 

    const setPanelStyle = (style) => {
        const panelStyle = {};
        switch (style) {
            case "Grid":                              
                if (layout && layout.grid) {                    
                    const { grid } = layout;                    
                    if (grid.columns) {    
                        if (showNavigator) {
                            Object.assign(panelStyle, { gridTemplateColumns: `repeat(${grid.columns}, calc((100% - 28px) / ${grid.columns})` });
                        }   
                        else {
                            Object.assign(panelStyle, { gridTemplateColumns: `repeat(${grid.columns}, auto)` });
                        }
                    } 
                    else {
                        Object.assign(panelStyle, { gridTemplateColumns: "repeat(auto-fill, 124px)" });
                    }

                    if (grid.rows) {
                        if (showNavigator) {
                            Object.assign(panelStyle, { gridTemplateRows: `repeat(${grid.rows}, calc((100% - 8px) / ${grid.rows})` });
                        }
                        else {
                            Object.assign(panelStyle, { gridTemplateRows: `repeat(${grid.rows}, 1fr)` });
                        }
                    }
                    else {
                        Object.assign(panelStyle, { gridTemplateRows: "repeat(auto-fill, 160px)" });
                    }
                    return panelStyle;
                }
                else {
                    return {
                        gridTemplateColumns: "repeat(auto-fill, 124px)",
                        gridTemplateRows: "repeat(auto-fill, 160px)",
                    }
                }                
            case "List":
                if (layout && layout.list) {
                    const { list } = layout;                    
                    if (list.rows) {
                        return {
                            gridTemplateColumns: "repeat(1, 100%)",
                            gridTemplateRows: `repeat(${list.rows}, calc((100% - (8px * (${list.rows} - 1))) / ${list.rows}))`,
                        }
                    }
                    else {
                        return {
                            gridTemplateColumns: "repeat(1, 100%)",
                            gridTemplateRows: "repeat(auto-fill, 80px)",
                        };        
                    }

                }
                return {
                    gridTemplateColumns: "repeat(1, 100%)",
                    gridTemplateRows: "repeat(auto-fill, 80px)",
                };
            default:
                return null;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.layout_btn} onClick={gridClick}>
                    <img className={styles.grid_icon}/>
                </button>
                <button className={styles.layout_btn} onClick={listClick}>
                    <img className={styles.list_icon}/>
                </button>
            </div>   
            <div className={styles.panel}>
                <div className={styles.inner_panel} style={setPanelStyle(layoutForm)}>
                    {displayedItems}
                </div>
            </div>
            {
                showNavigator ? <div className={styles.navigator}>                    
                    {renderPageButtons()}                    
                </div>
                : null
            }            
        </div>        
    );
}