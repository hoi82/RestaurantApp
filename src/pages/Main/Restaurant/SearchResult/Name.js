import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { READY_TO_LOAD, SearchByName, RESULT_FAILED } from '../../../../actions/main/search';
import PanelGrid from '../../../../components/PanelGrid';
import { GridItem, ListItem, layout } from './Restaurant';
import styles from "./style.scss";

export default ({match}) => {       
    //TODO:            
    //1. Navigation 선택 가능하게 하고 아닐때는 스크롤 표시되게 할것    
    const restaurants = useSelector((store) => store.main.search.result);    
    const dispatch = useDispatch();    
    
    useEffect(() => {
        if (restaurants.status == READY_TO_LOAD || restaurants.status == RESULT_FAILED) {            
            dispatch(SearchByName(match.params.name));
        }
    }, []);

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