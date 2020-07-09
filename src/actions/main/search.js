import axios from "axios";
import url from "url";
import { axiosConfig } from "../../config/url";

export const READY_TO_LOAD = "READY_TO_LOAD";
export const NAME_LOADING = "NAME_LOADING";
export const NAME_LOADED = "NAME_LOADED";
export const NAME_FAILED = "NAME_FAILED";
export const CATEGORY_LOADING = "CATEGORY_LOADING";
export const CATEGORY_LOADED = "CATEGORY_LOADED";
export const CATEGORY_FAILED = "CATEGORY_FAILED";
export const COUNTRY_LOADING = "COUNTRY_LOADING";
export const COUNTRY_LOADED = "COUNTRY_LOADED";
export const COUNTRY_FAILED = "COUNTRY_FAILED";
export const STATE_LOADING = "STATE_LOADING";
export const STATE_LOADED = "STATE_LOADED";
export const STATE_FAILED = "STATE_FAILED";
export const LOCATION_LOADING = "LOCATION_LOADING";
export const LOCATION_LOADED = "LOCATION_LOADED";
export const LOCATION_FAILED = "LOCATION_FAILED";
export const RESULT_LOADING = "RESULT_LOADING";
export const RESULT_LOADED = "RESULT_LOADED";
export const RESULT_FAILED = "RESULT_FAILED";
export const RESULT_RESET = "RESULT_RESET";

const SEARCH_NAMES_URL = "http://localhost:3005/api/filter/names";
const CATEGORIES_URL = "http://localhost:3005/api/filter/categories";
const COUNTRY_URL = "http://localhost:3005/api/filter/countries";
const LOCATION_URL = "http://localhost:3005/api/filter/locations";
const STATE_URL = "http://localhost:3005/api/filter/states";
const SEARCH_BY_NAME_URL = "http://localhost:3005/api/search/name/";
const SEARCH_BY_CATEGORY_URL = "http://localhost:3005/api/search/category/";
const SEARCH_BY_LOCATION_URL = "http://localhost:3005/api/search/location";

export const GetNames = (name) => async (dispatch) => {
    dispatch({ type: NAME_LOADING });    
    try {        
        const { data } = await axios.get(SEARCH_NAMES_URL, Object.assign({}, axiosConfig, {params: {name: name}}));
        if (data.error) {
            dispatch({ type: NAME_FAILED, payload: data.error.code });
        }
        else {
            dispatch({ type: NAME_LOADED, payload: data });
        }         
    } catch (error) {                
        if (error.response) {
            dispatch({ type: NAME_FAILED, payload: error.response.status });
        }
        else {
            dispatch({ type: NAME_FAILED, payload: "NETWORK_ERROR" });
        }        
    }                
}

export const GetAllCategories = () => async (dispatch) => {
    dispatch({ type: CATEGORY_LOADING });
    try {
        const { data } = await axios.get(CATEGORIES_URL, axiosConfig);
        if (data.error) {
            dispatch({ type: CATEGORY_FAILED, payload: data.error.code });
        }
        else {
            dispatch({ type: CATEGORY_LOADED, payload: data });
        }        
    } catch (error) {
        if (error.response) {
            dispatch({ type: CATEGORY_FAILED, payload: error.response.status });
        }        
        else {
            dispatch({ type: CATEGORY_FAILED, payload: "NETWORK_ERROR" });
        }
    }
}

export const GetCountries = (name) => async (dispatch) => {    
    dispatch({ type: COUNTRY_LOADING });
    try {
        const { data } = await axios.get(COUNTRY_URL,  Object.assign({}, axiosConfig, {params: {name: name}}));
        if (data.error) {
            dispatch({ type: COUNTRY_FAILED, payload: data.error.code });
        }
        else {
            dispatch({ type: COUNTRY_LOADED, payload: data });
        }
    } catch (error) {
        if (error.response) {
            dispatch({ type: COUNTRY_FAILED, payload: error.response.status });
        }
        else {
            dispatch({ type: COUNTRY_FAILED, payload: "NETWORK_ERROR"});
        }
    }    
}

export const GetStates = (country) => {
    return (dispatch) => {
        dispatch({ type: STATE_LOADING });        
        return axios.get(STATE_URL, Object.assign({}, axiosConfig, {params: {country: country}})).then((res) => {
            dispatch({ type: STATE_LOADED, payload: res.data });
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: STATE_FAILED, payload: error.response.status });
            }
            else {
                dispatch({ type: STATE_FAILED, payload: "NETWORK_ERROR" });
            }            
        });
    }
}

export const fetchLocations = () => async (dispatch) => {
    dispatch({ type: LOCATION_LOADING });
    try {
        const { data } = await axios.get(LOCATION_URL, axiosConfig);        
        if (data.error) {
            dispatch({type: LOCATION_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: LOCATION_LOADED, payload: data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: LOCATION_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: LOCATION_FAILED, payload: "NETWORK_ERROR"});
        }        
    }
}

export const SearchByName = (name) => async (dispatch) => {
    dispatch({ type: RESULT_LOADING });    
    try {
        const { data } = await axios.get(url.resolve(SEARCH_BY_NAME_URL, name), {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },            
        });
        dispatch({ type: RESULT_LOADED, payload: data });
    } catch (error) {
        if (error.response) {
            dispatch({ type: RESULT_FAILED, payload: error.response.status });
        }
        else {
            dispatch({ type: RESULT_FAILED, payload: "NETWORK_ERROR" });
        }        
    }
}

export const SearchByCategory = (category) => async (dispatch) => {
    dispatch({ type: RESULT_LOADING });
    try {
        const { data } = await axios.get(url.resolve(SEARCH_BY_CATEGORY_URL, category), {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },            
        });
        dispatch({ type: RESULT_LOADED, payload: data });
    } catch (error) {
        if (error.response) {
            dispatch({ type: RESULT_FAILED, payload: error.response.status });
        }
        else {
            dispatch({ type: RESULT_FAILED, payload: "NETWORK_ERROR" });
        }        
    }
}

export const SearchByLocation = (country, state) => async (dispatch) => {
    dispatch({ type: RESULT_LOADING });
    try {
        const { data } = await axios.get(SEARCH_BY_LOCATION_URL, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            params: {
                country: country,
                state: state
            } 
        });
        dispatch({ type: RESULT_LOADED, payload: data });
    } catch (error) {
        if (error.response) {
            dispatch({ type: RESULT_FAILED, payload: error.response.status });   
        }
        else {
            dispatch({ type: RESULT_FAILED, payload: "NETWORK_ERROR" });   
        }        
    }
}