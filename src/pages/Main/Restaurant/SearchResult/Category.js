import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { READY_TO_LOAD, RESULT_FAILED, SearchByCategory } from '../../../../actions/main/search';
import PanelGrid from '../../../../components/PanelGrid';
import { Restaurant } from './Restaurant';
import styles from "./style.scss";

function Category({match}) {
    const restaurants = useSelector((store) => store.main.search.result);        
    const dispatch = useDispatch();

    useEffect(() => {
        if (restaurants.status == READY_TO_LOAD || restaurants.status == RESULT_FAILED) {
            dispatch(SearchByCategory(match.params.category));
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

export default Category;