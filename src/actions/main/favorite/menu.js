import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_FAVORITE_MENUS = "READY_TO_FETCH_FAVORITE_MENUS";
export const FETCHING_FAVORITE_MENUS = "FETCHING_FAVORITE_MENUS";
export const FAVORITE_MENUS_FETCHED = "FAVORITE_MENUS_FETCHED";
export const FAVORITE_MENUS_FETCH_FAILED = "FAVORITE_MENUS_FETCH_FAILED";
export const DELETE_FAVORITE_MENU = "DELETE_FAVORITE_MENU";
export const ADD_FAVORITE_MENU = "ADD_FAVORITE_MENU";
export const TOGGLE_ALL_FAVORITE_MENUS = "TOGGLE_ALL_FAVORITE_MENUS";
export const TOGGLE_FAVORITE_MENU = "TOGGLE_FAVORITE_MENU";
export const REMOVE_SELECTED_FAVORITE_MENUS = "REMOVE_SELECTED_FAVORITE_MENUS";

const FAVORITE_MENUS = "http://localhost:3005/api/favorite/menus";
const FAVORITE_MENU = "http://localhost:3005/api/favorite/menu";

export const fetchFavoriteMenus = () => (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: FETCHING_FAVORITE_MENUS, payload: auth.id});
    axios.get(FAVORITE_MENUS, axiosConfig).then((res) => {
        dispatch({type: FAVORITE_MENUS_FETCHED, payload: res.data});
    }).catch((err) => {
        dispatch({type: FAVORITE_MENUS_FETCH_FAILED, payload: err});
    })
}

const shouldFetch = (getState) => {
    const { main: { favorite: { menu }}} = getState();
    return (menu.status == READY_TO_FETCH_FAVORITE_MENUS) ||
        ((menu.status != FETCHING_FAVORITE_MENUS) && (menu.userid != "") && (menu.userid != auth.id));    
}

export const fetchFavoriteMenusIfNeed = () => (dispatch, getState) => {
    if (shouldFetch(getState))
        return dispatch(fetchFavoriteMenus());

    return null;
}

export const addFavoriteMenu = (id) => (dispatch, getState) => {
    const { auth } = getState();    
    dispatch({type: FETCHING_FAVORITE_MENUS, payload: auth.id});
    return axios.post(FAVORITE_MENU, {
        resid: id
    }, axiosConfig).then((res) => {
        dispatch({type: ADD_FAVORITE_MENU, payload: res.data});
    }).catch((err) => {                        
        dispatch({type: FAVORITE_MENUS_FETCH_FAILED, payload: err});
    });
}

export const removeFavoriteMenu = (id) => (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: FETCHING_FAVORITE_MENUS, payload: auth.id});
    return axios.delete(`${FAVORITE_MENU}/${id}`, axiosConfig).then((res) => {
        dispatch({type: DELETE_FAVORITE_MENU, payload: id});
    }).catch((err) => {
        dispatch({type: FAVORITE_MENUS_FETCH_FAILED, payload: err});
    })
}

export const toggleFavoriteMenu = (index) => (dispatch) => {
    dispatch({type: TOGGLE_FAVORITE_MENU, payload: index});
}

export const toggleAllMenus = (state) => (dispatch) => {
    dispatch({type: TOGGLE_ALL_FAVORITE_MENUS, payload: state});
}

export const removeSelectedFavoriteMenus = () => (dispatch, getState) => {
    const { auth, main : { favorite: { menu: { list } } }} = getState();    
    const filtered = list.filter((item) => item.selected == true).map((item) => item.id);    

    dispatch({type: FETCHING_FAVORITE_MENUS, payload: auth.id});
    return axios.put(FAVORITE_MENUS, filtered, axiosConfig).then((res) => {        
        dispatch({type: REMOVE_SELECTED_FAVORITE_MENUS, payload: res.data});
    }).catch((err) => {
        dispatch({type: FAVORITE_MENUS_FETCH_FAILED, payload: err});
    })
}