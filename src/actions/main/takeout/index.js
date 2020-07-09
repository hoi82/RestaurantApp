import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_TAKEOUTS = "READY_TO_FETCH_TAKEOUTS";
export const FETCHING_TAKEOUTS = "FETCHING_TAKEOUTS";
export const TAKEOUTS_FETCHED = "TAKEOUT_FETCHED";
export const TAKEOUTS_FETCH_FAILED = "TAKEOUTS_FETCH_FAILED";

const TAKEOUT_LIST = "http://localhost:3005/api/menus/takeout";

export const fetchTakeouts = (resid) => async (dispatch) => {     
    dispatch({type: FETCHING_TAKEOUTS, payload: resid});
    try {
        const { data } = await axios.get(`${TAKEOUT_LIST}/${resid}`, axiosConfig);
        if (data.error) {
            dispatch({type: TAKEOUTS_FETCH_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: TAKEOUTS_FETCHED, payload: data});
        }   
    } catch (error) {
        if (error.response) {
            dispatch({type: TAKEOUTS_FETCH_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: TAKEOUTS_FETCH_FAILED, payload: "NETWORK_ERROR"});
        }        
    }    
}

const shouldFetch = (getState, resid) => {
    const { main: { takeout }} = getState();    
    return takeout.status == READY_TO_FETCH_TAKEOUTS || (takeout.status != FETCHING_TAKEOUTS && takeout.resid != resid);
}

export const fetchTakeoutsIfNeed = (resid) => (dispatch, getState) => {
    if (shouldFetch(getState, resid))
        return dispatch(fetchTakeouts(resid));

    return null;
}