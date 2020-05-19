import React, { useState, useEffect } from 'react';
import path from "path";
import styles from "./styles.scss";
import Dropdown from '../../../../components/DropdownTextBox';
import { useSelector, useDispatch } from 'react-redux';
import { GetNames, READY_TO_LOAD, NAME_FAILED, SearchByName } from '../../../../actions/main/search';
import { endpoint } from '../../../../config/url';
import { useHistory } from 'react-router';

export default () => {    
    const names = useSelector((store) => store.main.search.name.filter);   
    const status = useSelector((store) => store.main.search.name.status);     
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (status == READY_TO_LOAD || status == NAME_FAILED)
            dispatch(GetNames(name));
    }, []);

    const handleChange = (value) => {
        dispatch(GetNames(value));
        setName(value);        
    }

    const handleSearch = (e) => {        
        if (name != "") {
            dispatch(SearchByName(name));
            history.push(path.resolve(endpoint.resultRestaurantByName, name));
        }        
    }    
        
    return (         
        <div className={styles.container}>
            <span className={styles.title}>Search by Name</span>
            <span className={styles.description}>Input the name what you want.</span>
            <div className={styles.name_search_box}>
                <Dropdown value={name} onChange={handleChange} items={names}/>
                <button className={styles.search_btn} onClick={handleSearch}>
                    <span className={styles.search_btn_title}>Search</span>
                </button>
            </div>            
        </div>        
    );
}