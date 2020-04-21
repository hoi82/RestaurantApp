import React, { useState, useEffect } from 'react';
import styles from "./style.scss";

const Item = (props) => {
    return (
        <button className={styles.item}>
            <div className={styles.item_panel}>
                <img className={styles.thumbnail} src={`data:image/png;base64,${props.item.thumbnail ? props.item.thumbnail : noImage}`}/>
                <span className={styles.title}>{props.item.title}</span>
            </div>            
        </button>
    )
}

export default (props) => {
    const [displayedItems, setDisplayedItems] = useState([]);

    useEffect(() => {
        setDisplayedItems(getRenderingItems(props.items));
    }, [props.items]);

    const getRenderingItems = (items) => {
        return items.map((item, i) => {
            return <Item key={i} item={item}/>
        })
    }    

    return (
        <div className={styles.panel}>
            <div className={styles.inner_panel}>
                {displayedItems}
            </div>
        </div>
    );
}

const noImage = `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`;
