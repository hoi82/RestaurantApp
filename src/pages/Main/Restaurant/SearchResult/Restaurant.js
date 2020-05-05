import React from 'react';
import styles from "./style.scss";
import { getFullAddress } from "../../../../utils/getStrings";
import noImage from "../../../../types/noImage";

export const GridItem = ({name, address, picture}) => {    
    return (        
        <button className={styles.restaurant_grid}>
            <img className={styles.grid_thumb} src={`data:image/png;base64,${picture ? picture : noImage}`}/>            
            <footer>
                <div><p>{name}</p></div>            
                <div><p>{address ? address.remains : ""}</p></div>                
            </footer>
        </button>
    )
};

export const ListItem = ({picture, name, address, businessHour}) => {
    return (
        <button className={styles.restaurant_list}>
            <img className={styles.thumb} src={`data:image/png;base64,${picture || noImage}`}/>
            <div className={styles.content_panel}>
                <div className={styles.content_inner_panel}>                    
                    <p>Name<span>{name}</span></p>                    
                    <p>Address<span>{getFullAddress(address)}</span></p>
                </div>
                <div className={styles.content_inner_panel}>
                    <p>Open <span>{businessHour ? businessHour.open : ""}</span>Close<span>{businessHour ? businessHour.close : ""}</span></p>
                </div>
            </div>            
        </button>
    )
};

export const layout = {
    grid: {
        columns: 4,
        rows: 2
    },   
    list: {
        rows: 8
    } 
}
