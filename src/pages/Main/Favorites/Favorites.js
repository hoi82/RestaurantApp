import React, { useState, useEffect } from 'react';
import { getFavoriteRestaurants } from '../Restaurant/utils';
import styles from "./Favorites.module.scss";
import { getFullAddress } from '../../../utils/getStrings';
import { IMAGE_URL } from '../../../config/url';
import noImage from '../../../types/noImage';
import { fetchFavoritesIfNeed } from '../../../actions/main/favorite/restaurant';
import { useDispatch, useSelector } from 'react-redux';

const GridType = ({name, address, thumbnail}) => {        
    return (
        <div className={styles.item_grid}>
            <img src={thumbnail ? `${IMAGE_URL}/${thumbnail}` : noImage}/>
            <div>{name}</div>
            <div>{getFullAddress(address)}</div>
        </div>
    )
}

const ListType = ({}) => {
    return (
        <div>
            list
        </div>
    )
}

export default function Favorites({}) {
    const [gridMode, setGridMode] = useState("Grid");
    const restaurants = useSelector((store) => store.main.favorite.restaurant);    
    const dispatch = useDispatch();    
    
    useEffect(() => {        
        dispatch(fetchFavoritesIfNeed());
    }, []);

    const renderRestaurants = (restaurants = []) => (
        restaurants.map((res, i) => {
            if (gridMode == "Grid") {
                return <GridType key={i} {...res}/>
            }
            else {
                return <ListType key={i} {...res}/>
            }
        })
    )

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
                <div className={gridMode == "Grid" ? styles.grid_grid : styles.grid_list}>
                    {renderRestaurants(restaurants.list)}
                </div>
            </div>                       
        </div>
    );
}