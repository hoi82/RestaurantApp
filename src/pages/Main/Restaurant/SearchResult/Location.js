import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { READY_TO_LOAD, SearchByLocation, RESULT_FAILED } from '../../../../actions/main/search';
import styles from "./style.scss";
import { GridItem, ListItem, layout } from './Restaurant';
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

    const renderRestaurant = (item, key, layout) => {
        switch (layout) {
            case "Grid":
                return <GridItem {...item} key={key}/>;
            case "List":
                return <ListItem {...item} key={key}/>;
            default:
                return null;
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Restaurants</p>
            {/* <p className={styles.body}>{`We found ${result.length} restaurants!`}</p>
            <p className={styles.description}>{`Searched Name : ${props.match.params.name}`}</p> */}
            <div className={styles.grid_container}>
                <PanelGrid items={restaurants.result} itemRenderer={renderRestaurant} showNavigator layout={layout}/>
            </div>   
        </div>
    );
}

export default Location;