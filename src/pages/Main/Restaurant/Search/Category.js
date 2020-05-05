import React, { useEffect } from 'react';
import path from "path";
import styles from "./styles.scss";
import PanelGrid from '../../../../components/PanelGrid';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllCategories, READY_TO_LOAD, CATEGORY_LOADING, CATEGORY_LOADED, CATEGORY_FAILED, SearchByCategory } from '../../../../actions/main/search';
import Error from '../../../Error';
import Loading from '../../../Loading';
import { endpoint } from '../../../../config/url';
import noImage from "../../../../types/noImage";

const GridItem = ({item, onClick}) => { 
    const handleClick = (e) => {
        onClick(item);
    }   

    return (
        <button className={styles.category_item_grid} onClick={handleClick}>
            <div className={styles.category_item_panel_grid}>
                <img className={styles.category_thumbnail_grid} src={`data:image/png;base64,${item.thumbnail ? item.thumbnail : noImage}`}/>
                <span className={styles.category_item_title_grid}>{item.name}</span>
            </div>            
        </button>        
    );
}

const ListItem = ({item, onClick}) => {
    const handleClick = (e) => {
        onClick(item);
    }   

    return (
        <button className={styles.category_item_list} onClick={handleClick}>
            <div className={styles.category_item_panel_list}>
                <img className={styles.category_thumbnail_list} src={`data:image/png;base64,${item.thumbnail ? item.thumbnail : noImage}`}/>
                <div className={styles.category_title_panel_list}>
                    <span className={styles.category_title_list}>{item.name}</span>
                </div>
            </div>
        </button>
    );
}

export default ({history}) => {
    const categories = useSelector((store) => store.main.search.category.filter);
    const status = useSelector((store) => store.main.search.category.status);    
    
    const dispatch = useDispatch();    
    
    useEffect(()=> {                
        if (status == READY_TO_LOAD || status == CATEGORY_FAILED) {            
            dispatch(GetAllCategories());
        }        
    },[]);       

    const handleCategoryClick = (item) => {               
        dispatch(SearchByCategory(item.name));        
        history.push(path.resolve(endpoint.resultRestaurantByCategory, item.name));
    }

    const renderCategory = (category, key, layout) => {
        switch (layout) {
            case "Grid":
                return <GridItem item={category} key={key} onClick={handleCategoryClick}/>;      
            default:
                return <ListItem item={category} key={key} onClick={handleCategoryClick}/>;
        }        
    };
    
    const renderContent = (status) => {
        switch (status) {
            case CATEGORY_LOADING:
                return <Loading/>;
            case CATEGORY_LOADED:
                return <div className={styles.container}>
                <span className={styles.title}>Search By Category</span>
                <span className={styles.description}>Select the category whay you want.</span>
                <PanelGrid items={categories} itemRenderer={renderCategory}/>
            </div>;
            case CATEGORY_FAILED:
                return <Error message="Failed on loading category list."/>
            default:
                return null;
        }
    }
        
    return (
        <React.Fragment>            
            {renderContent(status)}
        </React.Fragment>
    );
}