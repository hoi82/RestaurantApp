import React, { useEffect } from 'react';
import styles from "./Favorites.module.scss";
import { getFullAddress } from '../../../utils/getStrings';
import { IMAGE_URL, endpoint } from '../../../config/url';
import noImage from '../../../types/noImage';
import { fetchFavoritesIfNeed } from '../../../actions/main/favorite/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PanelGrid from '../../../components/PanelGrid';
import { fetchRestaurant } from '../../../actions/main/restaurant/details';
import StyledCheckBox from "../../../components/StyledCheckBox";

const Restaurant = ({id, name, address, thumbnail}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDetails = (e) => {
        dispatch(fetchRestaurant(id));
        history.push(`${endpoint.restaurantDetail}/${id}`);
    }

    return (
        <div className={styles.restaurant}>
            <img className={styles.thumb} src={thumbnail ? `${IMAGE_URL}/${thumbnail}` :  noImage}/>
            <div className={styles.content_panel}>                                   
                <span className={styles.name}>{name}</span>                
                <span>{getFullAddress(address)}</span>                
            </div>    
            <StyledCheckBox/>      
        </div>
    )
};

export default function Favorites({}) {    
    const restaurants = useSelector((store) => store.main.favorite.restaurant);    
    const dispatch = useDispatch();    
    
    useEffect(() => {        
        dispatch(fetchFavoritesIfNeed());
    }, []);

    const renderRestaurant = (item, key) => {
        return <Restaurant {...item} key={key}/>;
    }

    return (
        <div className={styles.container}> 
            <div className={styles.favorites}>
                <span className={styles.title}>My Favorites</span>
                <header className={styles.header}>
                    <button>Select All</button>
                    <div>
                        image area
                        <img/>
                        <img/>
                    </div>
                </header>                
                <div className={styles.grid_list}>
                <PanelGrid items={restaurants.list} itemRenderer={renderRestaurant} config={{lengthPerPage: 10, gap: "16px"}}/>
                </div>
            </div>                       
        </div>
    );
}