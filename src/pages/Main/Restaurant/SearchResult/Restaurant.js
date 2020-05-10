import React from 'react';
import styles from "./style.scss";
import { getFullAddress } from "../../../../utils/getStrings";
import noImage from "../../../../types/noImage";
import { useHistory } from 'react-router';
import { endpoint } from '../../../../config/url';
import path from "path";

initItem = {
    id: "",
    name: "",
    address: "",
    picture: "",
    businessHour: {
        open: "",
        close: "",
    },    
}

export const GridItem = ({_id, name, address, picture}) => {    
    const history = useHistory();
    console.log(_id);
    const handleDetails = (e) => {
        history.push(path.resolve(endpoint.restaurantDetail, name));
    }

    return (        
        <button className={styles.restaurant_grid} onClick={handleDetails}>
            <img className={styles.grid_thumb} src={`data:image/png;base64,${picture ? picture : noImage}`}/>            
            <footer>
                <div><p>{name}</p></div>            
                <div><p>{address ? address.remains : ""}</p></div>                
            </footer>
        </button>
    )
};

export const ListItem = ({_id, name, address, picture, businessHour}) => {
    const history = useHistory();

    const handleDetails = (e) => {
        history.push(path.resolve(endpoint.restaurantDetail, name));
    }

    return (
        <button className={styles.restaurant_list} onClick={handleDetails}>
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
