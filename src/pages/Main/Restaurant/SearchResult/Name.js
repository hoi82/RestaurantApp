import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { READY_TO_LOAD, SearchByName, RESULT_FAILED } from '../../../../actions/main/search';
import PanelGrid from '../../../../components/PanelGrid';
import { Restaurant } from './Restaurant';
import styles from "./style.scss";

export default ({match}) => {               
    const restaurants = useSelector((store) => store.main.search.result);    
    const dispatch = useDispatch();    
    
    useEffect(() => {
        if (restaurants.status == READY_TO_LOAD || restaurants.status == RESULT_FAILED) {            
            dispatch(SearchByName(match.params.name));
        }        
    }, []);

    const renderRestaurant = (item, key, layout) => {
        return <Restaurant {...item} key={key}/>;
    }

    return (
        <div className={styles.container}>            
            <p className={styles.title}>Restaurants</p>                   
            <div className={styles.grid_container}>
                <PanelGrid items={restaurants.result} itemRenderer={renderRestaurant} config={{lengthPerPage: 10, gap: "16px"}}/>
            </div>            
        </div>
    );
}