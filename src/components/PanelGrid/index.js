import React, { useState, useRef } from 'react';
import styles from "./style.scss";
import prev from "../../image/left-arrow.svg";
import next from "../../image/next.svg";
import first from "../../image/back.svg";
import last from "../../image/skip.svg";

const defaultConfig = {
    lengthPerPage: 9,    
    borderWidth: "32px",
    borderColor: "rgb(240,240,245)",
    gap: "16px"
}

export default ({items = [], itemRenderer, config = defaultConfig}) => {        
    const [pageNumber, setPageNumber] = useState(0);
    const [itemLength, setItemLength] = useState(config.lengthPerPage || 0); 
    const panel = useRef();       

    const getRenderingItems = (items) => {
        if (itemLength) {
            return items.slice(itemLength * pageNumber, itemLength * (pageNumber + 1)).map((item, i) => {
                return itemRenderer(item, i);
            });
        }else {            
            return items.map((item, i) => {
                return itemRenderer(item, i);
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

    return (
        <div className={styles.container}>              
            {
                items.length > 0 ? <div className={styles.panel} 
                style={{
                    borderWidth: config.borderWidth ? config.borderWidth : 0, 
                    borderColor: config.borderColor ? config.borderColor : null,
                    backgroundColor: config.borderColor ? config.borderColor : null,
                    borderRadius: config.borderWidth ? null : "0"}}>
                    <div ref={panel} className={styles.inner_panel} style={{gap: config.gap, gridTemplateRows: itemLength ? `repeat(${itemLength}, minmax(min-content, max-content))` : "repeat(auto-fill, 1fr)"}}>
                        {getRenderingItems(items)}
                    </div>                
                </div> : null                
            }
            {
                getNavigationButtonCount() > 1 ? <div className={styles.navigator}>                    
                    {renderPageButtons()}                    
                </div>
                : null
            }            
        </div>        
    );
}