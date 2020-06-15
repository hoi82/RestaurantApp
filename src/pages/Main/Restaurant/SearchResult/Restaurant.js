import React from 'react';
import styles from "./style.scss";
import { getFullAddress } from "../../../../utils/getStrings";
import noImage from "../../../../types/noImage";
import { useHistory } from 'react-router';
import { endpoint, IMAGE_URL } from '../../../../config/url';
import { useDispatch } from 'react-redux';
import { fetchRestaurantIfNeed } from '../../../../actions/main/restaurant/details';
import { Link } from 'react-router-dom';

export const Restaurant = ({id, name, address, thumbnail}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDetails = (e) => {
        dispatch(fetchRestaurantIfNeed(id));        
    }

    return (
        <div className={styles.restaurant_list} onClick={handleDetails}>
            <img className={styles.thumb} src={thumbnail ? `${IMAGE_URL}/${thumbnail}` :  noImage}/>
            <div className={styles.content_panel}>                                   
                <Link className={styles.name} to={`${endpoint.restaurantDetail.replace(":id", id)}`} onClick={handleDetails}>{name}</Link>
                {/* <span>7.1</span> */}
                <span>{getFullAddress(address)}</span>                
            </div>            
        </div>
    )
};
