import axios from "axios";
import { axiosConfig } from "../../../config/url";

export const READY_TO_FETCH_TAKEOUTS = "READY_TO_FETCH_TAKEOUTS";
export const FETCHING_TAKEOUTS = "FETCHING_TAKEOUTS";
export const TAKEOUTS_FETCHED = "TAKEOUT_FETCHED";
export const TAKEOUTS_FETCH_FAILED = "TAKEOUTS_FETCH_FAILED";

const TAKEOUT_LIST = "http://localhost:3005/api/menus/takeout";

export const fetchTakeouts = (resid) => (dispatch) => {     
    dispatch({type: FETCHING_TAKEOUTS, payload: resid});
    return axios.get(`${TAKEOUT_LIST}/${resid}`, axiosConfig).then((res) => {
        dispatch({type: TAKEOUTS_FETCHED, payload: res.data});
    }).catch((err) => {
        dispatch({type: TAKEOUTS_FETCH_FAILED, payload: err});
    });
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