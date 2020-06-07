import React, { useState, useEffect } from 'react';
import path from "path";
import styles from "./styles.scss";
import DropdownBox from '../../../../components/DropdownBox';
import { useSelector, useDispatch } from 'react-redux';
import { GetNames, READY_TO_LOAD, NAME_FAILED, SearchByName } from '../../../../actions/main/search';
import { endpoint } from '../../../../config/url';
import { useHistory } from 'react-router';
import { ErrorMessages } from '../../../../types/ErrorMessages';

export default () => {    
    const names = useSelector((store) => store.main.search.name.filter);   
    const status = useSelector((store) => store.main.search.name.status);     
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (status == READY_TO_LOAD || status == NAME_FAILED)
            dispatch(GetNames(name));
    }, []);

    const handleChange = (value) => {
        dispatch(GetNames(value));
        setName(value);
        setError(value.trim() == "" ? ErrorMessages.EMPTY_TEXT : "");
    }

    const handleSearch = (e) => {        
        if (name.trim() != "") {
            dispatch(SearchByName(name));
            history.push(path.resolve(endpoint.resultRestaurantByName, name));
        } else {
            setError(ErrorMessages.EMPTY_TEXT);
        }      
    }    

    const handleFocus = (e) => {
        if (typeof e.target == "input") {            
            setError("");
        }
    }

    const handleBlur = (e) => {
        if (e.relatedTarget == null) {            
            setError(name.trim() == "" ? ErrorMessages.EMPTY_TEXT : "");            
        }
    }
        
    return (         
        <div className={styles.container}>
            <span className={styles.title}>Search by Name</span>
            <span className={styles.description}>Input the name what you want.</span>
            <div className={styles.search_container}>
                <div className={styles.name_search_box} onFocus={handleFocus} onBlur={handleBlur}>
                    <DropdownBox value={name} onChange={handleChange} items={names} editable/>
                    <button className={styles.search_btn} onClick={handleSearch}>Search</button>
                </div>        
                <span className={styles.error_text}>{error}</span>
            </div>                        
        </div>        
    );
}