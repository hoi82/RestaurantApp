import axios from "axios";

export const READY_TO_LOAD_RESTAURANT = "READY_TO_LOAD_RESTAURANT";
export const LOADING_RESTAURANT = "LOADING_RESTAURANT";
export const LOADED_RESTAURANT = "LOADED_RESTAURANT";
export const FAIL_TO_LOAD_RESTAURANT = "FAIL_TO_LOAD_RESTAURANT";

const RESTAURANT_DETAIL_URL = "http://localhost:3005/api/restaurant"

export const fetchRestaurant = (id) => {
    return (dispatch) => {
        dispatch({type: LOADING_RESTAURANT});
        return axios.get(`${RESTAURANT_DETAIL_URL}/${id}`, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            withCredentials: true, 
        }).then((res) => {
            dispatch({type: LOADED_RESTAURANT, payload: res.data})
        }).catch((err) => {
            dispatch({type: FAIL_TO_LOAD_RESTAURANT, payload: err});
        })
    };
}
