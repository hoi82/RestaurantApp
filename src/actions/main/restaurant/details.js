import axios from "axios";
import { axiosConfig } from "../../../config/url";

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

export const fetchRestaurant = (id) => {        
    return (dispatch) => {
        dispatch({type: LOADING_RESTAURANT, payload: id});
        return axios.get(`${RESTAURANT_DETAIL_URL}/${id}`, axiosConfig).then((res) => {
            dispatch({type: LOADED_RESTAURANT, payload: res.data})
        }).catch((err) => {
            dispatch({type: FAIL_TO_LOAD_RESTAURANT, payload: err});
        })
    };
}
