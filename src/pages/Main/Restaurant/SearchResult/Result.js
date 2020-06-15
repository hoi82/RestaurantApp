import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { READY_TO_LOAD, SearchByCategory, SearchByName, SearchByLocation } from '../../../../actions/main/search';
import PanelGrid from '../../../../components/PanelGrid';
import { Restaurant } from './Restaurant';
import styles from "./style.scss";
import { useParams, useLocation } from 'react-router';
import { endpoint } from '../../../../config/url';

function Result({match}) {
    const restaurants = useSelector((store) => store.main.search.result);      
    const param = useParams();
    const dispatch = useDispatch();
    const location = useLocation();    

    useEffect(() => {        
        if (restaurants.status == READY_TO_LOAD) {
            const path = match.path.replace(/\/\:(name|category)/, "");            
            switch (path) {
                case endpoint.resultRestaurantByName:
                    dispatch(SearchByName(param.name));                    
                    break;
                case endpoint.resultRestaurantByCategory:
                    dispatch(SearchByCategory(param.category));                    
                    break;
                case endpoint.resultRestaurantByLocation:
                    const query = new URLSearchParams(location.search); 
                    dispatch(SearchByLocation(query.get("country"), query.get("state")));                              
                    break;
                default:
                    break;
            }            
        }
    },[]);

    const renderRestaurant = (item, key) => {        
        return <Restaurant {...item} key={key}/>;
    }

    return (
        <div className={styles.container}>            
            <p className={styles.title}>Restaurants</p>            
            <div className={styles.grid_container}>
                <PanelGrid items={restaurants.result} itemRenderer={renderRestaurant} config={{lengthPerPage: 10}}/>
            </div>            
        </div>
    );
}

export default Result;