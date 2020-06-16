import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_MENUS = "READY_TO_FETCH_MENUS";
export const FETCHING_MENUS = "FETCHING_MENUS";
export const MENUS_FETCHED = "MENUS_FETCHED";
export const MENUS_FETCH_FAILED = "MENu_FETCH_FAILED";

const MENU_URL = "http://localhost:3005/api/menus";

export const fetchMenus = (restaurantID) => (dispatch) => {
    dispatch({type: FETCHING_MENUS, payload: restaurantID});
    return axios.get(`${MENU_URL}/${restaurantID}`, axiosConfig).then((res) => {
        dispatch({type: MENUS_FETCHED, payload: res.data});
    }).catch((err) => {
        dispatch({type: MENUS_FETCH_FAILED, payload: err});
    })
}

const shouldFetch = (restaurantID, getState) => {
    const { menu } = getState().main;
    return (menu.status == READY_TO_FETCH_MENUS) || (menu.status != FETCHING_MENUS && menu.resid != restaurantID);
}

export const fetchMenusIfNeed = (restaurantID) => (dispatch, getState) => {
    if (shouldFetch(restaurantID, getState)) {
        return dispatch(fetchMenus(restaurantID));
    }

    return null;
}