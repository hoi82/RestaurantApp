import axios from "axios";
import { axiosConfig } from "../../../config/url";

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

export const fetchFavorites = () => (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    return axios.get(FAVORITE_LIST, axiosConfig).then((res) => {
        dispatch({type: FAVORITE_RESTAURANTS_FETCHED, payload: res.data});
    }).catch((err) => {
        dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: err});
    })
}

const shouldFetch = (getState) => {
    const { auth } = getState();
    const { main: { favorite: { restaurant }}} = getState();

    return (restaurant.status == READY_TO_FETCH_FAVORITE_RESTAURANTS) ||
        ((restaurant.status != FETCHING_FAVORITE_RESTAURANTS) && (restaurant.userid != "") && (restaurant.userid != auth.id));    
}

export const fetchFavoritesIfNeed = () => (dispatch, getState) => {
    if (shouldFetch(getState)) {
        return dispatch(fetchFavorites());
    }

    return null;
}

export const addFavorite = (id) => (dispatch, getState) => {
    const { auth } = getState();    
    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    return axios.post(`${FAVORITE_URL}`, {
        resid: id
    }, axiosConfig).then((res) => {
        dispatch({type: ADD_FAVORITE_RESTAURANT, payload: res.data});
    }).catch((err) => {                        
        dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: err});
    });
}

export const removeFavorite = (id) => (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    return axios.delete(`${FAVORITE_URL}/${id}`, axiosConfig).then((res) => {
        dispatch({type: DELETE_FAVORITE_RESTAURANT, payload: id});
    }).catch((err) => {
        dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: err});
    })
}

export const toggleFavorite = (index) => (dispatch) => {
    dispatch({type: TOGGLE_FAVORITE_RESTAURANT, payload: index});
}

export const toggleAll = (state) => (dispatch) => {
    dispatch({type: TOGGLE_ALL_FAVORITE_RESTAURANTS, payload: state});
    return null;
}

export const removeSelectedFavorites = () => (dispatch, getState) => {
    const { auth, main : { favorite: { restaurant: { list } } }} = getState();    
    const filtered = list.filter((item) => item.selected == true).map((item) => item.id);    

    dispatch({type: FETCHING_FAVORITE_RESTAURANTS, payload: auth.id});
    return axios.put(FAVORITE_LIST, filtered, axiosConfig).then((res) => {        
        dispatch({type: REMOVE_SELECTED_FAVORITE_RESTAURANTS, payload: res.data});
    }).catch((err) => {
        dispatch({type: FAVORITE_RESTAURANTS_FETCH_FAILED, payload: err});
    })
}