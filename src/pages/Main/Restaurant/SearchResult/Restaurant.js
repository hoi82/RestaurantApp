import React from 'react';
import styles from "./style.scss";
import { getFullAddress } from "../../../../utils/getStrings";
import noImage from "../../../../types/noImage";
import { useHistory } from 'react-router';
import { endpoint, IMAGE_URL } from '../../../../config/url';
import path from "path";

export const Restaurant = ({id, name, address, thumbnail, businessHour}) => {
    const history = useHistory();

    const handleDetails = (e) => {
        history.push(path.resolve(endpoint.restaurantDetail, id));
    }

    return (
        <button className={styles.restaurant_list} onClick={handleDetails}>
            <img className={styles.thumb} src={thumbnail ? `${IMAGE_URL}/${thumbnail}` :  noImage}/>
            <div className={styles.content_panel}>                                   
                <span className={styles.name}>{name}</span>
                {/* <span>7.1</span> */}
                <span>{getFullAddress(address)}</span>                
            </div>            
        </button>
    )
};
