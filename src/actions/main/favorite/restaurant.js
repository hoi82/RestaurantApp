import axios from "axios";
import { axiosConfig } from "../../../config/url";
import { LOG_IN_SUCCESS, SESSION_FOUND, SessionCheckIfNeed } from "../../auth";

export const READY_TO_FETCH_FAVORITE_RESTAURANTS = "READY_TO_FETCH_FAVORITE_RESTAURANTS";
export const FETCHING_FAVORITE_RESTAURANTS = "FETCHING_FAVORITE_RESTAURANTS";
export const FAVORITE_RESTAURANTS_FETCHED = "FAVORITE_RESTAURANTS_FETCHED";
export const FAVORITE_RESTAURANTS_FETCH_FAILED = "FAVORITE_RESTAURANTS_FETCH_FAILED";
export const DELETE_FAVORITE_RESTAURANT = "DELETE_FAVORITE_RESTAURANT";
export const ADD_FAVORITE_RESTAURANT = "ADD_FAVORITE_RESTAURANT";
export const TOGGLE_ALL_FAVORITE_RESTAURANTS = "TOGGLE_ALL_FAVORITE_RESTAURANTS";
export const TOGGLE_FAVORITE_RESTAURANT = "TOGGLE_FAVORITE_RESTAURANT";
export const REMOVE_SELECTED_FAVORITE_RESTAURANTS = "REMOVE_SELECTED_FAVORITE_RESTAURANTS";

const FAVORITE_LIST = "http://localhost:3005/api/favorite/restaurants";
const FAVORITE_URL = "http://localhost:3005/api/favorite/restaurant";

export const fetchFavorites = () => async (dispatch, getState) => {
    const { auth } = getState();    
    
    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    try {
        const { data } = await axios.get(FAVORITE_LIST, axiosConfig);
        if (data.error) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: FAVORITE_RESTAURANTS_FETCHED, payload: data});
        }        
    } catch (error) {
        if (error.response) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: error.response.status});
        }        
        else {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }    
}

const shouldFetch = (getState) => {
    const { auth } = getState();
    const { main: { favorite: { restaurant }}} = getState();    

    return (restaurant.status == READY_TO_FETCH_FAVORITE_RESTAURANTS) ||
        ((restaurant.status != FETCHING_FAVORITE_RESTAURANTS) && (restaurant.userid != "") && (restaurant.userid != auth.id) && auth.isLogin);    
}

export const fetchFavoritesIfNeed = () => (dispatch, getState) => {    
    dispatch(SessionCheckIfNeed()).then(() => {
        const { auth } = getState();        
        if (shouldFetch(getState) && auth.isLogin) {     
            return dispatch(fetchFavorites());
        }    
    })

    return new Promise((resolve, reject) => {
        resolve(null);
    });
}

export const addFavorite = (id) => async (dispatch, getState) => {
    const { auth } = getState();    
    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    try {
        const { data } = await axios.post(`${FAVORITE_URL}`, {resid: id}, axiosConfig);
        if (data.error) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: ADD_FAVORITE_RESTAURANT, payload: res.data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: error.response.status});
        }        
        else {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }        
    }    
}

export const removeFavorite = (id) => async (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    try {
        const { data } = await axios.delete(`${FAVORITE_URL}/${id}`, axiosConfig);
        if (data.error) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: DELETE_FAVORITE_RESTAURANT, payload: id});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: error.response.status});
        }        
        else {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }    
}

export const toggleFavorite = (index) => (dispatch) => {
    dispatch({type: TOGGLE_FAVORITE_RESTAURANT, payload: index});
}

export const toggleAll = (state) => (dispatch) => {
    dispatch({type: TOGGLE_ALL_FAVORITE_RESTAURANTS, payload: state});
    return null;
}

export const removeSelectedFavorites = () => async (dispatch, getState) => {
    const { auth, main : { favorite: { restaurant: { list } } }} = getState();    
    const filtered = list.filter((item) => item.selected == true).map((item) => item.id);        

    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    try {
        const { data } = await axios.put(FAVORITE_LIST, filtered, axiosConfig);
        if (data.error) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: REMOVE_SELECTED_FAVORITE_RESTAURANTS, payload: res.data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: error.response.status});
        }        
        else {
            dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }        
    }    
}