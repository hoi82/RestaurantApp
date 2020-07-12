import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_MENU = "READY_TO_FETCH_MENU";
export const FETCHING_MENU = "FETCHING_MENU";
export const MENU_FETCHED = "MENU_FETCHED";
export const MENU_FETCH_FAILED = "MENU_FETCH_FAILED";

const MENU_URL = "http://localhost:3005/api/menu";

export const fetchMenu = (id) => async (dispatch) => {
    dispatch({type: FETCHING_MENU, payload: id});
    try {
        const { data } = await axios.get(`${MENU_URL}/${id}`, axiosConfig);
        if (data.error) {
            dispatch({type: MENU_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: MENU_FETCHED, payload: data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: MENU_FETCH_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: MENU_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }
    }
}