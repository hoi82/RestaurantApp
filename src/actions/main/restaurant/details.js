import axios from "axios";
import { axiosConfig } from "../../../config/url";
import { fetchFavoritesIfNeed } from "../favorite/restaurant";
import { fetchMenusIfNeed } from "../menu";

export const READY_TO_LOAD_RESTAURANT = "READY_TO_LOAD_RESTAURANT";
export const LOADING_RESTAURANT = "LOADING_RESTAURANT";
export const LOADED_RESTAURANT = "LOADED_RESTAURANT";
export const FAIL_TO_LOAD_RESTAURANT = "FAIL_TO_LOAD_RESTAURANT";

const RESTAURANT_DETAIL_URL = "http://localhost:3005/api/restaurant";

export const fetchRestaurantIfNeed = (id) => ((dispatch, getState) => {    
    if (shouldFetch(getState, id)) {                    
        return dispatch(fetchRestaurant(id));
    }

    return null;
});

const shouldFetch = (getState, id) => {
    const {main : { restaurant: {details : {status, id : oriID}} }} = getState();    
    return status == READY_TO_LOAD_RESTAURANT || 
        (status != LOADING_RESTAURANT && oriID != id);  
};

export const fetchRestaurant = (id) => async (dispatch) => {
    dispatch({type: LOADING_RESTAURANT, payload: id});
    try {
        const { data } = await axios.get(`${RESTAURANT_DETAIL_URL}/${id}`, axiosConfig);
        if (data.error) {
            dispatch({type: FAIL_TO_LOAD_RESTAURANT, payload: data.error.code});
        }        
        else {            
            dispatch({type: LOADED_RESTAURANT, payload: data});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: FAIL_TO_LOAD_RESTAURANT, payload: error.response.status});
        }   
        else {
            dispatch({type: FAIL_TO_LOAD_RESTAURANT, payload: "NETWORK_ERROR"});
        }             
    }    
};

export const fetchDetailsOnce = (id) => async (dispatch, getState) => {
    dispatch(fetchRestaurantIfNeed(id)).then(() => {
        const { main: {restaurant: {details: { status: detailStatus }}}} = getState();
        if (detailStatus == LOADED_RESTAURANT) {
            dispatch(fetchFavoritesIfNeed()).then(() => {
                const { main: { favorite: { restaurant: { status }}}} = getState();
                dispatch(fetchMenusIfNeed(id));
            })
        }
    })
}

