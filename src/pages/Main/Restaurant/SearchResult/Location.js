import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { READY_TO_LOAD, SearchByLocation, RESULT_FAILED } from '../../../../actions/main/search';
import styles from "./style.scss";
import { Restaurant } from './Restaurant';
import PanelGrid from '../../../../components/PanelGrid';

function Location({location}) {
    const restaurants = useSelector((store) => store.main.search.result);
    const dispatch = useDispatch();    

    useEffect(() => {        
        if (restaurants.status == READY_TO_LOAD || restaurants.status == RESULT_FAILED) {            
            const param = new URLSearchParams(location.search);
            const country = param.get("country");
            const state = param.get("state");
            dispatch(SearchByLocation(country, state));
        }
    },[]);

    const renderRestaurant = (item, key) => {
        return <Restaurant {...item} key={key}/>;
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Restaurants</p>
            {/* <p className={styles.body}>{`We found ${result.length} restaurants!`}</p>
            <p className={styles.description}>{`Searched Name : ${props.match.params.name}`}</p> */}
            <div className={styles.grid_container}>                
                <PanelGrid items={restaurants.result} itemRenderer={renderRestaurant} config={{lengthPerPage: 10, gap: "16px"}}/>
            </div>   
        </div>
    );
}

export default Location;