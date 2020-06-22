import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_FAVORITES = "READY_TO_FETCH_FAVORITES";
export const FETCHING_FAVORITES = "FETCHING_FAVORITES";
export const FAVORITES_FETCHED = "FAVORITES_FETCHED";
export const FAVORITES_FETCH_FAILED = "FAVORITES_FETCH_FAILED";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const TOGGLE_ALL_FAVORITES = "TOGGLE_ALL_FAVORITES";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const REMOVE_SELECTED_FAVORITE = "REMOVE_SELECTED_FAVORITE";

const FAVORITE_LIST = "http://localhost:3005/api/favorite/restaurants";
const FAVORITE_URL = "http://localhost:3005/api/favorite/restaurant";

export const fetchFavorites = () => (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: FETCHING_FAVORITES, payload: auth.id});
    return axios.get(FAVORITE_LIST, axiosConfig).then((res) => {
        dispatch({type: FAVORITES_FETCHED, payload: res.data});
    }).catch((err) => {
        dispatch({type: FAVORITES_FETCH_FAILED, payload: err});
    })
}

const shouldFetch = (getState) => {
    const { auth } = getState();
    const { restaurant } = getState().main.favorite;

    return (restaurant.status == READY_TO_FETCH_FAVORITES) ||
        ((restaurant.status != FETCHING_FAVORITES) && (restaurant.userid != "") && (restaurant.userid != auth.id));    
}

export const fetchFavoritesIfNeed = () => (dispatch, getState) => {
    if (shouldFetch(getState)) {
        return dispatch(fetchFavorites());
    }

    return null;
}

export const addFavorite = (id) => (dispatch, getState) => {
    const { auth } = getState();    
    dispatch({type: FETCHING_FAVORITES, payload: auth.id});
    return axios.post(`${FAVORITE_URL}`, {
        resid: id
    }, axiosConfig).then((res) => {
        dispatch({type: ADD_FAVORITE, payload: res.data});
    }).catch((err) => {                        
        dispatch({type: FAVORITES_FETCH_FAILED, payload: err});
    });
}

export const removeFavorite = (id) => (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: FETCHING_FAVORITES, payload: auth.id});
    return axios.delete(`${FAVORITE_URL}/${id}`, axiosConfig).then((res) => {
        dispatch({type: DELETE_FAVORITE, payload: id});
    }).catch((err) => {
        dispatch({type: FAVORITES_FETCH_FAILED, payload: err});
    })
}

export const toggleFavorite = (index) => (dispatch) => {
    dispatch({type: TOGGLE_FAVORITE, payload: index});
}

export const toggleAll = (state) => (dispatch) => {
    dispatch({type: TOGGLE_ALL_FAVORITES, payload: state});
    return null;
}

export const removeSelectedFavorites = () => (dispatch, getState) => {
    const { auth, main : { favorite: { restaurant: { list } } }} = getState();    
    const filtered = list.filter((item) => item.selected == true).map((item) => item.id);    

    dispatch({type: FETCHING_FAVORITES, payload: auth.id});
    return axios.put(FAVORITE_LIST, filtered, axiosConfig).then((res) => {        
        dispatch({type: REMOVE_SELECTED_FAVORITE, payload: res.data});
    }).catch((err) => {
        dispatch({type: FAVORITES_FETCH_FAILED, payload: err});
    })
}