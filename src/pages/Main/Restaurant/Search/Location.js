import React, { useState, useEffect } from 'react';
import styles from "./styles.scss";
import DropdownTextBox from '../../../../components/DropdownTextBox';
import { useSelector, useDispatch } from 'react-redux';
import { GetCountries, READY_TO_LOAD, GetStates, COUNTRY_FAILED, STATE_FAILED, SearchByLocation } from '../../../../actions/main/search';
import ErrorPage from "../../../Error";
import { endpoint } from '../../../../config/url';
import { useHistory } from 'react-router';
import { ErrorMessages } from '../../../../types/ErrorMessages';

export default () => {    
    const countries = useSelector((store) => store.main.search.location.country.filter);
    const countryStatus = useSelector((store) => store.main.search.location.country.status);
    const states = useSelector((store) => store.main.search.location.states.filter);
    const statesStatus = useSelector((store) => store.main.search.location.states.status);    
    const [country, setCountry] = useState("");    
    const [matchedCountry, setMatchedCountry] = useState("");
    const [state, setState] = useState("");   
    const [displayedStates, setDisplayedStates] = useState([]);   
    const [error, setError] = useState("");   
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {        
        dispatch(GetCountries(country));
    }, []);

    useEffect(() => {
        if (matchedCountry != "") {   
            setState("");         
            dispatch(GetStates(matchedCountry));            
        }
    }, [matchedCountry]);

    useEffect(() => {
        setDisplayedStates(states);
    }, [states]);

    const handleCountryChange = (value) => {                  
        setCountry(value);
        dispatch(GetCountries(value));
        setMatchedCountry(countries.includes(value) ? value : "");
    }    

    const handleStateChange = (value) => {        
        setState(value.name);  
        setDisplayedStates(states.filter((state) => state.name.toLowerCase().indexOf(value.name.toLowerCase()) > -1));      
    }

    const handleSearch = (e) => {   
        if (country.trim() != "") {
            dispatch(SearchByLocation(country, state)); 
            history.push(endpoint.resultRestaurantByLocation + `?country=${matchedCountry}&state=${state}`);
        }
        else {
            setError(ErrorMessages.EMPTY_TEXT);
        }
    }

    const handleFocus = (e) => {
        if (typeof e.target == "input") {
            setError("");
        }
    }

    const handleBlur = (e) => {        
        setError(country.trim() == "" ? ErrorMessages.EMPTY_TEXT : "");        
    }

    const renderCountry = () => {        
        return <div className={styles.location_search_box} onFocus={handleFocus} onBlur={handleBlur}>            
            <span>Country</span>
            <DropdownTextBox value={country} onChange={handleCountryChange} items={countries}/>
            <span className={styles.error_text}>{error}</span>
        </div> 
    }

    const renderSubRegion = () => {
        if (matchedCountry != "") {
            return <div className={styles.location_search_box}>
                <span>State or City</span>
                <DropdownTextBox value={state} onChange={handleStateChange} items={displayedStates}/>
            </div>    
        }

        return null;
    }

    const renderContent = () => {        
        if (countryStatus == COUNTRY_FAILED || statesStatus == STATE_FAILED) {
            return <ErrorPage message="Failed on loading country list."/>;
        }
        else {
            return <div className={styles.container}>                
                <span className={styles.title}>Search By Location</span>
                <span className={styles.description}>Input the location whay you want.</span>   
                {renderCountry()}
                {renderSubRegion()}
                <button className={styles.location_search_btn} onClick={handleSearch}>Search</button>
            </div>;
        }
    }
    
    return (
        <React.Fragment>
            {renderContent()}
        </React.Fragment>        
    );
}