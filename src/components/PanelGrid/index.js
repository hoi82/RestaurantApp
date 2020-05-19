import React, { useState, useEffect } from 'react';
import styles from "./style.scss";
import gridIcon from "../../image/grid.svg";
import listIcon from "../../image/list.svg";
import prev from "../../image/left-arrow.svg";
import next from "../../image/next.svg";
import first from "../../image/back.svg";
import last from "../../image/skip.svg";

const defaultConfig = {
    lockLayout: false,
    showNavigator: true,    
    fitContentSizeToPanel: true,    
    layout: {
        grid: {},
        list: {}
    }
}

export default ({items = [], itemRenderer, config = defaultConfig}) => {    
    const [layoutForm, setLayoutForm] = useState(config.lockLayout ? config.lockLayout : "Grid");
    const [pageNumber, setPageNumber] = useState(0);
    const [itemLength, setItemLength] = useState(0);    

    useEffect(() => {
        if (layoutForm == "Grid") {
            let { columns, rows } = config.layout && config.layout.grid ? config.layout.grid : defaultConfig.layout.grid;
            if (columns && rows)
                setItemLength((config.layout.grid.columns || 1) * (config.layout.grid.rows || 1));
        }
        else {
            let { rows } = config.layout && config.layout.list ? config.layout.list : defaultConfig.layout.list;
            if (rows)
                setItemLength((config.layout.list.rows));
        }
    }, layoutForm);    

    const getRenderingItems = (items) => {                
        if (config.showNavigator && config.layout) {                        
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
            <img src={prev}/>
        </button>);
        buttons.unshift(<button key={-4} onClick={handleMoveFirst}>
            <img src={first}/>
        </button>);
        buttons.push(<button key={-2} onClick={handleMoveNext}>
            <img src={next}/>
        </button>);            
        buttons.push(<button key={-1} onClick={handleMoveLast}>
            <img src={last}/>
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
                let { grid } = config.layout ? config.layout : defaultConfig.layout;
                                                    
                if (grid.columns) {    
                    if (config.showNavigator && config.fitContentSizeToPanel) {
                        Object.assign(panelStyle, { gridTemplateColumns: `repeat(${grid.columns}, calc((100% - 28px) / ${grid.columns})` });
                    }                       
                    else {
                        Object.assign(panelStyle, { gridTemplateColumns: `repeat(${grid.columns}, minmax(min-content, max-content))` });
                    }
                } 
                else {
                    Object.assign(panelStyle, { gridTemplateColumns: "repeat(auto-fill, 124px)" });
                }

                if (grid.rows) {
                    if (config.showNavigator && config.fitContentSizeToPanel) {
                        Object.assign(panelStyle, { gridTemplateRows: `repeat(${grid.rows}, calc((100% - 8px) / ${grid.rows})` });                            
                    }
                    else {
                        Object.assign(panelStyle, { gridTemplateRows: `repeat(${grid.rows}, minmax(min-content, max-content))` });
                    }
                }
                else {
                    Object.assign(panelStyle, { gridTemplateRows: "repeat(auto-fill, 160px)" });
                }
                return panelStyle;
                           
            case "List":
                let { list } = config.layout || defaultConfig.layout;
                                 
                if (list.rows) {
                    if (config.showNavigator && config.fitContentSizeToPanel) {
                        return {
                            gridTemplateColumns: "repeat(1, 100%)",
                            gridTemplateRows: `repeat(${list.rows}, calc((100% - (8px * (${list.rows} - 1))) / ${list.rows}))`,                            
                        }                        
                    }
                    else {
                        return {
                            gridTemplateColumns: "repeat(1, 100%)",                            
                            gridTemplateRows: `repeat(${Math.min(list.rows, items.length - (pageNumber * list.rows))}, minmax(min-content, max-content))`,                            
                        }
                    }                    
                }
                else {
                    return {
                        gridTemplateColumns: "repeat(1, 100%)",
                        gridTemplateRows: "repeat(auto-fill, 80px)",
                    };        
                }
                                
            default:
                return null;
        }
    }

    return (
        <div className={styles.container}>
            {
                config.lockLayout ? null : <div className={styles.header}>
                    <button className={styles.layout_btn} onClick={gridClick}>
                        <img className={styles.icon} src={gridIcon}/>
                    </button>
                    <button className={styles.layout_btn} onClick={listClick}>
                        <img className={styles.icon} src={listIcon}/>
                    </button>
                </div> 
            }            
            {
                items.length > 0 ? <div className={styles.panel}>
                    <div className={styles.inner_panel} style={setPanelStyle(layoutForm)}>                    
                        {getRenderingItems(items)}
                    </div>                
                </div> : null                
            }
            {
                config.showNavigator && items.length > 0 ? <div className={styles.navigator}>                    
                    {renderPageButtons()}                    
                </div>
                : null
            }            
        </div>        
    );
}