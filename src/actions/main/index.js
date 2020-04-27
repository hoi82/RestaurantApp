import axios from "axios";

export const SEARCH_RESTAURANT_BY_NAME = "SEARCH_RESTAURANT_BY_NAME";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const READY_TO_LOAD = "READY_TO_LOAD";
export const DATA_LOADING = "DATA_LOADING";
export const DATA_LOADED = "DATA_LOADED";
export const DATA_FAILED = "DATA_FAILED";

const SEARCH_NAMES_URL = "http://localhost:3005/api/filter/names";
const CATEGORIES_URL = "http://localhost:3005/api/filter/categories";

export const GetNames = (name) => {
    return (dispatch) => {
        dispatch({ type: DATA_LOADING, payload: { name: DATA_LOADING } });
        return axios.get(SEARCH_NAMES_URL, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            params: {
                name: name
            },
            withCredentials: true
        }).then((res) => {
            dispatch({ type: DATA_LOADED, payload: [{names: DATA_LOADED}, { names: res.data }] });
        }).catch((err) => {
            dispatch({ type: DATA_FAILED, payload: err });
        });
    }
}

export const GetAllCategories = () => {    
    return (dispatch) => {         
        dispatch({ type: DATA_LOADING, payload: { categories: DATA_LOADING } });
        axios.get(CATEGORIES_URL, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {            
            dispatch({ type: DATA_LOADED, payload: [{categories: DATA_LOADED}, { categories: res.data }] });                    
        }).catch((err) => {
            dispatch({ type: DATA_FAILED, payload: err });
        });
    }
}