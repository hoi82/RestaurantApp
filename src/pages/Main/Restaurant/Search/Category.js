import React, { useEffect } from 'react';
import styles from "./styles.scss";
import PanelGrid from '../../../../components/PanelGrid';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllCategories, READY_TO_LOAD, DATA_LOADING, DATA_LOADED } from '../../../../actions/main';

export default (props) => {
    const categories = useSelector((store) => store.main.search.categories);
    const status = useSelector((store) => store.main.status.categories);
    const dispatch = useDispatch();    
    
    useEffect(()=> {        
        if (status == READY_TO_LOAD) {            
            dispatch(GetAllCategories());
        }        
    },[]);       
    
    const renderContent = (status) => {
        switch (status) {
            case DATA_LOADING:
                return <p>Loading...</p>;
            case DATA_LOADED:
                return <PanelGrid items={categories}/>;
            default:
                return null;
        }
    }
        
    return (
        <div className={styles.container}>
            <span className={styles.title}>Search By Category</span>
            <span className={styles.description}>Select the category whay you want.</span>
            {renderContent(status)}
        </div>
    );
}