import React, { useEffect } from 'react';
import path from "path";
import styles from "./styles.scss";
import { useSelector, useDispatch } from 'react-redux';
import { GetAllCategories, READY_TO_LOAD, CATEGORY_LOADING, CATEGORY_LOADED, CATEGORY_FAILED, SearchByCategory } from '../../../../actions/main/search';
import Error from '../../../Error';
import Loading from '../../../Loading';
import { endpoint, IMAGE_URL } from '../../../../config/url';
import noImage from "../../../../types/noImage";
import { useHistory } from 'react-router';

const CategoryItem = ({name, thumbnail}) => { 
    const dispatch = useDispatch(); 
    const history = useHistory();
    const result = useSelector((store) => store.main.search.result);       

    const handleClick = (e) => {
        dispatch(SearchByCategory(name));
        history.push(path.resolve(endpoint.resultRestaurantByCategory, name));
    }   

    return (
        <button className={styles.category_item_grid} disabled={result.isPending} onClick={handleClick}>
            <div className={styles.category_item_panel_grid}>
                <img className={styles.category_thumbnail_grid} src={thumbnail ? `${IMAGE_URL}/${thumbnail}` : noImage}/>
                <span className={styles.category_item_title_grid}>{name}</span>
            </div>            
        </button>        
    );
}

export default () => {
    const categories = useSelector((store) => store.main.search.category.filter);
    const status = useSelector((store) => store.main.search.category.status);          
    const dispatch = useDispatch();        
    
    useEffect(()=> {                
        if (status == READY_TO_LOAD || status == CATEGORY_FAILED) {            
            dispatch(GetAllCategories());
        }        
    },[]);           

    const renderCategories = () => {
        return categories.map((category, i) => (
            <CategoryItem key={i} {...category}/>
        ))
    }
    
    const renderContent = (status) => {
        switch (status) {
            case CATEGORY_LOADING:
                return <Loading/>;
            case CATEGORY_LOADED:
                return <div className={styles.container}>
                <span className={styles.title}>Search By Category</span>
                <span className={styles.description}>Select the category whay you want.</span>
                <div className={styles.grid}>
                    {renderCategories()}
                </div>                
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